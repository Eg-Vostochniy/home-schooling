import { AddingBlock } from '../components/Home/AddingBlock'
import { HomeContent } from '../components/Home/HomeContent'


export const Home: React.FC = () => {

    return (
        <div className='home'>
            <AddingBlock />
            <HomeContent />
        </div>
    )
}


