contextAPI에 대해 설명하기 위해 `리액트를 사용하는 기술` 서적에서 발췌한 예제.

구체적인 설명은 [usecodeflow](https://usecodeflow.com/)에서 할 예정이었으나 현재 에러가 나는군요...

일단 아래에 향후에 첨부할 해당 설명을 써놓습니다.

---

`React`의 `ContextAPI`에 대해 알아봅시다.

예제는 `velopert` 님의 [리액트를 다루는 기술](https://www.google.com/search?q=리액트를+다루는+기술&sxsrf=ACYBGNSYyWB2KOH62glT0k8vBeD3Nniv-w:1582093690544&source=univ&tbm=shop&tbo=u&sa=X&ved=2ahUKEwiRkLSj_tznAhWAyYsBHZY8BLcQsxh6BAgLEEw&biw=1920&bih=1001)이란 서적에서 발췌하였습니다.



컴포넌트가 처음 시작하는 `App.js` 컴포넌트를 봅시다.

개발자가 직접 만든 컴포넌트인 `ColorProvider`라는 컴포넌트 하위에 자식 컴포넌트들이 있는 것을 확인할 수 있습니다.

먼저 `ColorProvider`를 살펴봅시다.

---

`ColorProvider`는 `ColorContext`라는 컨텍스트를 사용하고 있습니다.

---

`Context`를 만드는 방법은 `React`에서 제공하는 `createContext` 메서드를 이용해 가능합니다.

인자로는 기본 값을 넣어줍니다.

해당 컨텍스트는 객체를 기본 값으로 가지고 있습니다.

```json
{
  state : {
    color : "black",
    subColor : "red"
  },
  action : {
    setColor : () => {},
    setSubColor : () => {}
  }
}
```

코드 상에서는 이렇게 생긴 기본 값을 넣어주었습니다.

만약 객체가 아닌 기본 자료형 값을 넣어주고 싶다면, 그렇게 해도 됩니다.

```javascript
const Context = createContext("context")
```

이런 식으로도 말이죠.

---

다시 `ColorProvider`로 돌아와서, `Context.Provider`라는 식으로 컴포넌트를 생성하는 것을 볼 수 있습니다.

`Provider`는 하위 컴포넌트들에게 `context`가 변경되면, 해당 변화를 알리는 역할을 수행합니다. `Context`를 이용해서만 생성 가능하며, **반드시 `value`라는 프로퍼티를 받습니다.** 만약 `.Provider`에 `value`를 주입하지 않았을 경우, 오류가 발생합니다.

> **그렇다면 아까 `createContext()` 당시 기입한 값은 무슨 의미가 있나**
>
> `Provider` 하위에 있지 않은 요소에서 `context`에 접근할 때 사용됩니다.

---

`useState`를 이용해서 `Provider` 하위 컴포넌트에서 사용할 값들을 생성해줍니다.

---

`.Consumer`는 `context` 변화를 구독하는 컴포넌트입니다. 이 컴포넌트의 하위 요소는 반드시 **함수**여야 하며, 상위에 `Provider`가 없다면 `context`를 만들 당시 넣은 기본 값이 `value`로 들어옵니다.

이런 식으로 받을 수 있습니다.

```jsx
import React from 'react'
import {ColorConsumer} from '../contexts/color'

const Test = () => {
	return(
    <ColorConsumer>
    	{value => (
      	<p>value.state.color</p>
      )}
    </ColorConsumer>
	)
}
```

혹은 `Consumer`를 이용하지 않고, `Hooks`를 통해 가져올 수도 있습니다.

```jsx
import React, {useContext} from 'react'
import ColorContext from '../contexts/color'
// 컨텍스트 자체를 가지고 와서

const Test = () => {
  const value = useContext(ColorContext)
  // 해당 컨텍스트를 찾습니다.
  
  return (
    <p>{value.state.color}</p>
  )
}
```

외부에서도 사용할 수 있도록 `ColorProvider`, `ColorConsumer`, `ColorContext`를 `export` 합니다.

---

> 20-02-20
>
> TODO
>
> - hooks만 사용했을 때 확인해보기

