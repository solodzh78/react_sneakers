import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={220}
    height={292}
    viewBox="0 0 220 292"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="30" y="30" rx="0" ry="0" width="133" height="112" /> 
    <rect x="30" y="179" rx="0" ry="0" width="158" height="34" /> 
    <rect x="30" y="231" rx="0" ry="0" width="95" height="33" /> 
    <rect x="146" y="231" rx="0" ry="0" width="33" height="33" />
  </ContentLoader>
)

export const Loaders = () => ([...Array(8)].map((item, index) => <MyLoader key={index} />));

export default MyLoader