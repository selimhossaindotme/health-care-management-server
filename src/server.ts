import { Server } from "http"
import app from "./app.js"
import { envVars } from "./config/index.js";



async function startServer() {
    let server : Server

    try {
        
        server = app.listen(envVars.port, () => {
           console.log(`🚀 Server is running on http://localhost:${envVars.port}`);
        });

        // Function to gracefully shut down the server
        const existHandler = () => {
            if( server ) {
                server.close(() => {
                    console.log("Server closed gracefully.");
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        };

        //handle unhandled promise rejections
        process.on("unhandledRejection", (error) => {
            console.error("Unhandled Rejection:", error);
            if ( server ) {
                server.close(() => {
                    console.log(error)
                    process.exit(1)
                })
            }
            else {
                process.exit(1)
            }
        })

    } catch (error) {
        console.error("Error starting server:", error)
        process.exit(1)
    }

}

startServer()