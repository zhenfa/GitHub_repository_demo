import { useParams  } from 'react-router-dom'

export function WrapComps ( props ) {
    let params = useParams();
    let Element = props.element;
    return <Element params={params} {...props} /> 
}
