
import ClipLoader from "react-spinners/ClipLoader";


function Spinner() {

    return (<div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}>
        <div style={{
            position: 'absolute',
            //'margin-left': '360px', 'right': '775px' 
            'margin-left': '40%', 'margin-top': '45vh'

        }}>
            <ClipLoader
                color={'red'}
                loading={true}
                size={150}

                data-testid="loader"
            />
        </div>
    </div>);
}

export default Spinner;