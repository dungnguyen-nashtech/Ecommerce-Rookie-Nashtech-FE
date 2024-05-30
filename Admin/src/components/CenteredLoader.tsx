import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const CenteredLoader: React.FC = () => {

    return (
        <div
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={styles.loaderContainer}
        >
            <ClipLoader size={"5rem"} color="#36d7b7"/>
        </div>
    );
};

const styles = {
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
    }
};

export default CenteredLoader;
