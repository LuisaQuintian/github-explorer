import { RepositoryList } from './components/RepositoryList'
import './styles/global.scss'

//<> </>fragment = artefato do react que permite uma tag sem nada dentro. Isso existe pois n da pra retornar elementos separados, só se enveloparmos eles e deixarmos como um só. Porém, se colocassemos uma div, poderia dar conflito com o css depois, então se usa o fragment.
export function App() {
    return (
    <> 
        <RepositoryList />
    </>
    )
}

