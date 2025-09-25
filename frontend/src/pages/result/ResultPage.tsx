import './ResultPage.css';

import Navbar from '../../shared_components/Navbar.tsx';
import ContinueBox from './ContinueBox.tsx';
import SaveBox from './SaveBox.tsx';
import DeleteBox from './DeleteBox.tsx';

function ResultPage({message} : {message : string}) {
    return (
        <>
            <Navbar />
            <div className='resultpage'>
                <ContinueBox message={message} />
                <SaveBox  />
                <DeleteBox  />
            </div>
        </>
    )
}

export default ResultPage;