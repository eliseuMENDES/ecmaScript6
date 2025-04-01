import React, {useState, useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, Button, Badge } from 'react-bootstrap';
import './style/App.css';

function App() {
    const [estudos, setEstudos] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [activeTab, setActiveTab] = useSate('estudos');

    useEffect(() => {
        // Carrega dados do JSON
        fetch('/api/estudos')
        .then(res => res.json())
        .then(data => setEstudos(data.modulos));

        fetch('/api/estudos')
        .then(res => res.json())
        .then(data => setEstudos(data.modulos));

        fetch('/api/exercicios')
        .then(res => res.json())
        .then(data => setExercicios(data.exercicios));
    }, []);

    const executarCodigo = (codigo) => {
        try {
            //Cria uma função a partir do código string e executa
            const fn = new Function(`return ${codigo}`)();
            // Exemplo para a calculadora:
            if (codigo.includes('calculadora')) {
                return fn(10, 5, '+'); //TESTA COM VALORES EXEMPLO
            }
            return fn('teste')
        } catch (error) {
            return `Erro: ${error.message}`;
        }
    };
    
    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={3}>
                <Card>
                    <Card.Header>
                        <h4>Meus Estudos JS</h4>
                    </Card.Header>
                    <Card.Body>
                        <Button variant="outline-primary" block onClick={() => setActiveTab('estudos')}>
                            Módulos de Estudo
                        </Button>
                        <Button variant="outline-success" blcok className="mt-2" onClick={() => setActiveTab('exercicios')}>
                            Exercicios Práticos
                        </Button>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={9}>
                {activeTab === 'estudos' && (
                    <Card>
                        <Card.Header>
                            <h4>Módulos de Estudo</h4>
                        </Card.Header>
                        <Card.Body>
                            <Accordion>
                                {estudos.map(modulo => {
                                    <Accordion.Item key={modulo.id} eventKey={modulo.id}>
                                        <Accordion.Header>
                                            {modulo.titulo}
                                            {modulo.concluido && (
                                                <Badge bg="success" className="ms-2">Concluido</Badge>
                                            )}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {modulo.topicos.map((topico, index) =>(
                                                    <li key={index}>{topico}</li>
                                                ))}  
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })}
                            </Accordion>
                        </Card.Body>
                    </Card>
                )}

                {activeTab === 'exercicios' && (
                    <Card>
                        <Card.Headers>
                            <h4>Exercicios Práticos</h4>
                        </Card.Headers>
                        <Card.Body>
                            {exercicios.map(ex => {
                                <Card key={ex.id} className="mb-3">
                                    <Card.Header>
                                        <h5>{ex.titulo} <Badge bg="info">{ex.dificuldade}</Badge></h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>{ex.descricao}</p>
                                        <pre><code>{ex.code}</code></pre>

                                        <Button variant="primary" onClick={() => {
                                            const resultado = executarCodigo(ex.solucao);
                                            alert(`Resultado: ${resultado}`);
                                        }}>
                                            Executar Solução
                                        </Button>
                                    </Card.Body>
                                </Card>
                            })}
                        </Card.Body>
                    </Card>
                )}
                </Col>
            </Row>
        </Container>
    );
}

export default App;