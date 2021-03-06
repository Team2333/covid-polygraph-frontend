import { useState, useEffect, useReducer } from 'react';
import { Button, TextArea, Layout, Typography, Toast } from '@douyinfe/semi-ui';
import { useLocale } from '../lib/i18n';
import { verifyApi } from '../lib/api';
import Loading from './loading';

function resultReducer(state: string, action: { type: string, payload?: string }) {
  switch (action.type) {
    case 'clear':
      return '';
    case 'append':
      return state + action.payload;
    default:
      throw new Error();
  }
}

function isLegitReducer(state: { real: number, fake: number }, action: { type: string, payload?: { isReal: boolean, num: number } }) {
  switch (action.type) {
    case 'clear':
      return { real: 0, fake: 0 };
    case 'update':
      if (action.payload) {
        if (action.payload.isReal) {
          return {
            ...state,
            real: state.real + action.payload.num,
          };
        } else {
          return {
            ...state,
            fake: state.fake + action.payload.num,
          };
        }
      } else {
        return { real: 0, fake: 0 };
      }
    default:
      throw new Error();
  }
}

const Main = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const locale = useLocale({
    textTitle: {
      zh_CN: '文本',
      en_US: 'Text',
      ja_JP: 'テキスト',
      ms_MY: 'Teks',
    },
    resultTitle: {
      zh_CN: '结果',
      en_US: 'Result',
      ja_JP: '結果',
      ms_MY: 'Keputusan',
    },
    buttonText: {
      zh_CN: '提交',
      en_US: 'Submit',
      ja_JP: '提出',
      ms_MY: 'Hantar',
    },
    fakeText: {
      zh_CN: '虚假',
      en_US: 'Fake',
      ja_JP: '偽',
      ms_MY: 'Bukan',
    },
    realText: {
      zh_CN: '真实',
      en_US: 'Real',
      ja_JP: '実',
      ms_MY: 'Benar',
    },
    textLoading: {
      zh_CN: '正在检测...',
      en_US: 'Checking...',
      ja_JP: '検査中...',
      ms_MY: 'Memeriksa...',
    },
  }, 'en_US');

  const [text, setText] = useState('');
  const [loadingProps, setLoadingProps] = useState({ active: false, text: '' });
  const [isReal, setIsReal] = useState<boolean | null>(null);
  const [result, resultDispatch] = useReducer(resultReducer, '');
  const [isLegit, isLegitDispatch] = useReducer(isLegitReducer, { real: 0, fake: 0 });

  useEffect(() => {
    if (isLegit.real === 0 && isLegit.fake === 0) {
      setIsReal(null);
    } else if (isLegit.real === 0 && isLegit.fake !== 0) {
      setIsReal(false);
    } else if (isLegit.fake === 0 && isLegit.real !== 0) {
      setIsReal(true);
    } else if (isLegit.real > isLegit.fake) {
      setIsReal(true);
    } else {
      setIsReal(false);
    }
  }, [isLegit]);

  const onSubmit = async () => {
    setLoadingProps({ active: true, text: locale.textLoading });
    try {
      const paras = text.split('\n').map(x => x.trim());
      resultDispatch({ type: 'clear' });
      isLegitDispatch({ type: 'clear' });
      setIsReal(null);
      for (let i = 0; i < paras.length; i++) {
        const para = paras[i];
        if (para.length > 0) {
          const res = await verifyApi(para);
          isLegitDispatch({ type: 'update', payload: { isReal: res.isReal, num: res.data.length } });
          res.data.forEach(x => {
            const h = `${x.isStart ? '<span style="word-spacing:normal; letter-spacing:normal;">&nbsp;</span>' : ''}<span style="color:${x.color}; word-spacing:normal; letter-spacing:normal;${x.impt ? ' text-decoration:underline;' : ''}">${x.token}</span>\n`;
            resultDispatch({ type: 'append', payload: h });
          });
        } else {
          resultDispatch({ type: 'append', payload: '<br /><br />\n' });
        }
      }
    } catch (e) {
      Toast.error(e as string);
    } finally {
      setLoadingProps({ active: false, text: '' });
    }
  };

  return (
    <Content className='main-container'>
      <div className='textarea-container'>
        <div className='textarea-item'>
          <Title
            heading={3}
            style={{ alignSelf: 'center' }}
          >
            {locale.textTitle}
          </Title>
          <div style={{
            flex: 1,
            display: 'flex',
          }}>
            <TextArea
              showClear
              className='textarea-container'
              style={{ flex: 1 }}
              value={text}
              onChange={setText}
            />
          </div>
        </div>
        <Button
          theme='solid'
          className='submit-button-inside'
          disabled={loadingProps.active || text.trim().length === 0}
          onClick={onSubmit}
        >
          {locale.buttonText}
        </Button>
        <div className='textarea-item'>
          <Title
            heading={3}
            style={{ alignSelf: 'center' }}
          >
            {locale.resultTitle} {isReal === null ? '' : isReal ? `(${locale.realText})` : `(${locale.fakeText})`}
          </Title>
          <div
            className='overflow-container'
            style={{
              flex: 1,
              backgroundColor: 'var(--paras-color-bg)',
              borderRadius: '4px',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: result }}
              className='overflow-content result-content'
            />
          </div>
        </div>
      </div>
      <Button
        theme='solid'
        className='submit-button-outside'
        disabled={loadingProps.active || text.trim().length === 0}
        onClick={onSubmit}
      >
        {locale.buttonText}
      </Button>
      <Loading {...loadingProps} />
    </Content>
  );
};

export default Main;
