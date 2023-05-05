import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation';

export const Home = () => {
    return (
        <div className='page'>
            <div className='logo'>que-a-song</div>
            <Navigation />
            <Footer />
        </div>
    );
};
