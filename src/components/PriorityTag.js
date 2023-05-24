import React from 'react'
import { Tag } from 'primereact/tag';

function PriorityTag({ priority }) {
    //const [priority] = useState(['L', 'N', 'H']);

    const getPriority = (priority) => {
        switch (priority) {
            case 'L':
                return 'success';

            case 'N':
                return 'warning';

            case 'H':
                return 'danger';

            default:
                return null;
        }
    };

    const getPriorityValue = (priority) => {
        switch (priority) {
            case 'L':
                return 'Low';

            case 'N':
                return 'Normal';

            case 'H':
                return 'High';

            default:
                return null;
        }
    };

    return <Tag value={getPriorityValue(priority)} severity={getPriority(priority)}></Tag>;
}

export default PriorityTag
