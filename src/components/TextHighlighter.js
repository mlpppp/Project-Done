// 有就在周围加上mark如果很长的话就只显示周围的100个Word
// 如果没有的话就原样返回raw

export default function TextHighlighter({raw, keyword}) {
  let raw_ = raw.toLowerCase()
  let keyword_ = keyword.toLowerCase()
  if (!raw_.includes(keyword_)) return ( <span>{raw.substring(0, 80)}</span> )

  let len = keyword_.length
  let start = raw_.indexOf(keyword_)

  if (raw.length<100) {
    return (
      <>
        <span>
          {raw.slice(0, start)}
          <mark>{raw.slice(start, start+len)}</mark>
          {raw.slice(start+len)}
        </span>
      </>
    )
  } else {    // return 100 characters around the keyword
    return (
      <>
        <span>
          {"..." + raw.slice(((start-50)<0 ? 0:start-50), start)}
          <mark>{raw.slice(start, start+len)}</mark>
          {raw.slice(start+len, start+50) + "..."}
        </span>
      </>
    )
  }

}
