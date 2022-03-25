import { useState } from 'react';

function UseToggle ( initVal=false ) {
    const [state, setState] = useState(initVal)
    
    const toggle= () => setState(!state)

    return [state, toggle];
}

export default UseToggle;