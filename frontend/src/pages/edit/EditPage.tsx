import { useLocation } from 'react-router-dom';

import './EditPage.css';

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