
import "./ProductLandingPage.css"
import "./responsive.css"
import { useEffect, useState } from "react";
import { searchCars } from "../../helpers/carHelpers";
import Loading from "../Loading/Loading";
import { Link } from 'react-router-dom'
import FilterButtons from "./FilterButtons";

function ProductLandingPage() {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    useEffect(() => {
        searchCars()
            .then(data => setResults(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <Loading />

    return (
        <div className="App">
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <FilterButtons/>
                        <main className="col-md-9">
                            <header className="border-bottom mb-4 pb-3">
                                <div className="form-inline">
                                    <span className="mr-md-auto">{results.length} resultados encontrados  </span>
                                </div>
                            </header>
                            <div className="row">
                                {results.map(item => (
                                    <div key={item.id} className="col-md-4">
                                        <figure className="card card-product-grid">
                                            <div className="img-wrap">
                                                <span className="badge badge-danger"> NEW </span>
                                                <img alt={item.nombre} src={item.imageURL}/>
                                            </div>
                                            <figcaption className="info-wrap">
                                                <div className="fix-height">
                                                    <Link to={"/product-details/" + item.id} className="title">{item.nombre}</Link>
                                                    <div className="price-wrap mt-2">
                                                        <span className="price">${item.precio}</span>
                                                        
                                                    </div>
                                                </div>
                                                <Link to={"/product-details/" + item.id} className="btn btn-block btn-primary">Ver</Link>
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default ProductLandingPage;