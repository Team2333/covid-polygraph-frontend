import { useState, useReducer } from 'react';
import { Button, TextArea, Layout, Typography } from '@douyinfe/semi-ui';
import { useLocale } from '../lib/i18n';
import { verifyApi } from '../lib/api';

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
  }, 'en_US');

  const [text, setText] = useState('');
  const [result, resultDispatch] = useReducer(resultReducer, '');

  const onSubmit = async () => {
    const paras = text.split('\n').map(x => x.trim());
    resultDispatch({ type: 'clear' });
    for (let i = 0; i < paras.length; i++) {
      const para = paras[i];
      const res = await verifyApi(para);
      if (para.length > 0) {
        const h = `<p>${para}</p>\n`;
        console.log(h);
        resultDispatch({ type: 'append', payload: h });
      } else {
        resultDispatch({ type: 'append', payload: '\n' });
      }
    }
    console.log(result);
  };

  return (
    <Content className='main-container'>
      <div className='textarea-container'>
        <div className='textarea-item'>
          <Title
            heading={3}
            style={{ alignSelf: 'center' }}
          >
            { locale.textTitle }
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
          onClick={onSubmit}
        >
          {locale.buttonText}
        </Button>
        <div className='textarea-item'>
          <Title
            heading={3}
            style={{ alignSelf: 'center' }}
          >
            { locale.resultTitle }
          </Title>
          <div
            className='overflow-container'
            style={{
              flex: 1,
              backgroundColor: 'var(--semi-color-bg-3)',
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
        onClick={onSubmit}
      >
        { locale.buttonText }
      </Button>
    </Content>
  );
};

export default Main;
