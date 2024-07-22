const { config } = require("../../config")

const runner = async(app) => {
    let PORT = +config.port
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    })
};

module.exports = runner;