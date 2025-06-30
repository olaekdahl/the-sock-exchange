import PropTypes from 'prop-types';

const DocumentCount = ({ itemCount }) => {

    return (
        <div>
            <strong>Total Document Count: {itemCount}</strong>
        </div>
    );
};

DocumentCount.propTypes = {
    itemCount: PropTypes.number.isRequired,
};

export default DocumentCount;