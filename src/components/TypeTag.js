import React from 'react'
import { Tag } from 'primereact/tag';

function TypeTag({ type }) {
    //const [types] = useState(['B', 'E', 'Q']);

    const getType = ( type ) => {
        switch (type) {
            case 'E':
                return 'info';

            case 'Q':
                return 'warning';

            case 'B':
                return 'danger';

            default:
                return null;
        }
    };

    const getTypeValue = (type) => {
        switch (type) {
            case 'E':
                return 'Enchancement';

            case 'Q':
                return 'Question';

            case 'B':
                return 'Bug';

            default:
                return null;
        }
    };

    return <Tag value={getTypeValue( type )} severity={getType( type )}></Tag>;
}

export default TypeTag