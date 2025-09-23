import { useLocation } from 'react-router-dom';

import './EditPage.css';

import Navbar from '../../shared_components/Navbar.tsx';
import EditForm from './EditForm.tsx';

function EditPage() {

    return (
        <>
            <Navbar />
            <EditForm />
        </>
    )
}

export default EditPage;