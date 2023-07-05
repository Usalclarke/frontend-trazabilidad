import { Link, } from 'react-router-dom';

const Menu = (props) => {

    //MUESTA LOS BOTONES DE CADA MENU 
    return (
        <div className='formulario'>
            <div className='grid grid-flow-col justify-stretch'>
                {// eslint-disable-next-line react/prop-types
                    props.routes.map((prop, index) => {
                        return (
                            <div key={index} className='px-10'>
                                <Link to={prop.path}><button className="btn btn-primario btn-submit" key={index}>{prop.name}</button></Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Menu;