// POINT useCallbackで再レンダリングを抑止
import React, { useCallback, useState } from "react";
import Child from "./Child";
import "./Example.css";

const Example = () => {
  console.log("Parent render");

  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  // 前提として、親コンポーネントが再レンダリングされたら子コンポーネントも再レンダリングされる
  // React.memoは、propsで受け取った値に変化がない場合に再レンダリングを防ぐ
  // clickHandlerは動作しないが、再レンダリングはされるため、子コンポーネントで新しい関数として検知され、再レンダリングされてしまう
  // これを防ぐのが「useCallback」！！
  const clickHandler = useCallback(() => {
    setCountB((pre) => pre + 1);
  }, []);

  return (
    <div className="parent">
      <div>
        <h3>親コンポーネント領域</h3>
        <div>
          <button
            onClick={() => {
              setCountA((pre) => pre + 1);
            }}
          >
            ボタンA
          </button>
          <span>親のstateを更新</span>
        </div>
      </div>
      <div>
        <p>ボタンAクリック回数：{countA}</p>
      </div>
      <Child countB={countB} onClick={clickHandler} />
    </div>
  );
};

export default Example;
