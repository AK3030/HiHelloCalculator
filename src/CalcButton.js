const operations = {
  'x': (a, b) => a*b,
  '÷': (a, b) => a/b,
  '-': (a, b) => a-b,
  '+': (a, b) => a+b,
  '=': true,
}

const greyOps = new Set(['AC', '+/-', '%']);

const getType = (val) => {
  if (operations[val]) {
    return 'orange-op';
  } else if (greyOps.has(val)) {
    return 'grey-op';
  } else {
    return 'number';
  }
}

function CalcButton({val, onClick}) {
    const buttonType = getType(val);
    const zeroClass = val === 0 ? 'zero' : '';
    const className = 'calc-button' + ' ' + buttonType +  ' ' + zeroClass;
    
    return (
      <button 
        onClick={onClick} 
        className={className}>{val}
      </button>
    );
  }
  
  export default CalcButton;