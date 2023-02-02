import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function MiApi() {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        consultarInformacion();
    }, []);

    const consultarInformacion = async (e) => {
        const url = 'https://aves.ninjas.cl/api/birds';
        const response = await fetch(url)
        const data = await response.json()
        setInfo(data);
        setLoading(false);
    }

    let orden = info.sort((a, b) => {
        if (a.name.spanish.toLowerCase() < b.name.spanish.toLowerCase()) {
            return -1;
        }
        if (a.name.spanish.toLowerCase() > b.name.spanish.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    const listado = orden.map((tarea, index) =>
        <Card key={index} className="apiCards">
            <Card.Img variant="top" src={tarea.images.thumb} />
            <Card.Body className="cardBody">
                <Card.Title className="cardTitle">{tarea.name.spanish}</Card.Title>
                <Card.Text className="cardText">Nombre científico: {tarea.name.latin}</Card.Text>
                <Button className="button" href={tarea._links.self}>Ver datos</Button>
            </Card.Body>
        </Card>
    );

    const capturaBuscar = (e) => {
        setBuscar(e.target.value)
    }

    const filtro = info.filter((birds) => (birds.name.spanish.toUpperCase().includes(buscar.toUpperCase()) || birds.name.latin.toUpperCase().includes(buscar.toUpperCase())));

    if (loading) {
        return (
            <div className="container loading">
                <h2>Cargando...</h2>
                <p>Esto podría tardar un momento. Agradecemos tu paciencia.</p>
                <img src="https://media0.giphy.com/media/3ohze0CB2d85MWg42k/giphy.gif?cid=ecf05e47sc8da8j9g3diz43umbfalb7gg2urtlszrkzx9o88&rid=giphy.gif&ct=g" alt="Loading..." />
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <h1>Aves de Chile</h1>
                </div>
                <div className="form">
                    <form>
                        <input type="text" placeholder="Buscar por nombre" className="search form-control" value={buscar} onChange={capturaBuscar} />
                    </form>
                </div>
                <div className="cards">
                    {(buscar === "") ? listado : filtro.map((tarea, index) =>
                        <Card key={index} className="apiCards">
                            <Card.Img variant="top" src={tarea.images.thumb} />
                            <Card.Body className="cardBody">
                                <Card.Title className="cardTitle">{tarea.name.spanish}</Card.Title>
                                <Card.Text className="cardText">Nombre científico: {tarea.name.latin}</Card.Text>
                                <Button className="button" href={tarea._links.self}>Ver datos</Button>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
            <div className="footer">
                <p>© 2023. Todas las aves deberían tener sus derechos reservados.</p>
            </div>
        </>
    );
}

export default MiApi;