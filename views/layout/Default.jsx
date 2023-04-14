const React = require('react')


function DefaultLayout(props) {
    const { title, children } = props;
    return(
    

        <html>
            <head>
                <title>{title}</title>
            </head>

            <body>
                <h1>{title}</h1>

                {children}
            </body>
        </html>
        
    )
}

module.exports = DefaultLayout;