const React = require('react');
const DefaultLayout = require('../layout/Default')

function Show(props){
    const {fruit} = props;
    console.log(fruit);
    return(
    <DefaultLayout title="Show Page">

    <div>
        <p>The {fruit.name} is {fruit.color} {fruit.readyToEat ? 'Its ready to eat' : 'It is not ready to eat... cant touch this' }</p>
    </div> 
    </DefaultLayout>
)
}


module.exports = Show;
