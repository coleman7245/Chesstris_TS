import { useContext } from 'react';
import { GameContext } from '../../App.tsx';

import Navbar from '../../shared_components/Navbar.jsx';
import Form from '../../shared_components/Form.jsx';

export default function Login() {

    return <div>
        <Navbar />
        <Form />
    </div>;
};