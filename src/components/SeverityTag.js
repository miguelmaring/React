import React from 'react'
import { Tag } from 'primereact/tag';

function SeverityTag({ severity }) {
    //const [severity] = useState(['W', 'M', 'N', 'I', 'C']);

    const getSeverity = (severity) => {
        switch (severity) {
            case 'W':
                return 'null';

            case 'M':
                return 'info';

            case 'N':
                return 'success';
            
            case 'I':
                return 'warning';
            
            case 'C':
                return 'danger';

            default:
                return null;
        }
    };

    const getSeverityValue = (severity) => {
        switch (severity) {
            case 'W':
                return 'Wishlist';

            case 'M':
                return 'Minor';

            case 'N':
                return 'Normal';
            
            case 'I':
                return 'Important';
            
            case 'C':
                return 'Critical';

            default:
                return null;
        }
    };

    return <Tag value={getSeverityValue(severity)} severity={getSeverity(severity)}></Tag>;
}

export default SeverityTag