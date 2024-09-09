import React from 'react'

function FilterButtons() {
    return (
        <aside className="col-md-3">
            <div className="card">
                <article className="filter-group">
                    <header className="card-header">
                        <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                            <i className="icon-control fa fa-chevron-down"></i>
                        </a>
                    </header>
                </article>
                <article className="filter-group">
                    <header className="card-header">
                        <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
                            <i className="icon-control fa fa-chevron-down"></i>
                            <h6 className="title">Marcas </h6>
                        </a>
                    </header>
                    <div className="filter-content collapse show" id="collapse_2">
                        <div className="card-body">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Mercedes
                                    <b className="badge badge-pill badge-light float-right">120</b>  </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Toyota
                                    <b className="badge badge-pill badge-light float-right">15</b>  </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Mitsubishi
                                    <b className="badge badge-pill badge-light float-right">35</b> </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Nissan
                                    <b className="badge badge-pill badge-light float-right">89</b> </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Honda
                                    <b className="badge badge-pill badge-light float-right">30</b>  </div>
                            </label>

                        </div>
                    </div>
                </article>
                <article className="filter-group">
                    <header className="card-header">
                        <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                            <i className="icon-control fa fa-chevron-down"></i>
                            <h6 className="title">Rango de Precio </h6>
                        </a>
                    </header>
                    <div className="filter-content collapse show" id="collapse_3">
                        <div className="card-body">
                            <input type="range" className="custom-range" min="0" max="100" name="" />
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Min</label>
                                    <input className="form-control" placeholder="$0" type="number" />
                                </div>
                                <div className="form-group text-right col-md-6">
                                    <label>Max</label>
                                    <input className="form-control" placeholder="$1,0000" type="number" />
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary">Aplicar</button>
                        </div>
                    </div>
                </article>
                <article className="filter-group">
                    <header className="card-header">

                    </header>
                    <div className="filter-content collapse show" id="collapse_4">

                    </div>
                </article>
                <article className="filter-group">

                    <div className="filter-content collapse in" id="collapse_5">
                        <div className="card-body">
                            <label className="custom-control custom-radio">
                                <input type="radio" name="myfilter_radio" defaultChecked="" className="custom-control-input" />
                                <div className="custom-control-label">Any condition</div>
                            </label>
                            <label className="custom-control custom-radio">
                                <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                <div className="custom-control-label">Brand new </div>
                            </label>
                            <label className="custom-control custom-radio">
                                <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                <div className="custom-control-label">Used items</div>
                            </label>
                            <label className="custom-control custom-radio">
                                <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                <div className="custom-control-label">Very old</div>
                            </label>
                        </div>
                    </div>
                </article>
            </div>
        </aside>
    )
}

export default FilterButtons