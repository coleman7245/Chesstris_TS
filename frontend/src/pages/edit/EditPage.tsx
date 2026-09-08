import { useLocation } from 'react-router-dom';

import Navbar from '../../shared_components/Navbar.tsx';
import EditForm from './EditForm.tsx';

export default function EditPage() {

    return (
        <>
            <Navbar />
            <EditForm />
        </>
    )
};