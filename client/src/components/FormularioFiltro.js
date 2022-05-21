import React from 'react';

const FormularioFiltro = ({ busqueda, dietas, filtro, filtroreceta, obtenerInformacion, onSubmitForm, filtrarDietasChange, handleInputChange }) => {
    return (
        <div>
            <form onSubmit={filtroreceta}>
                <label>Elegir dietas:</label>
                <select name='dietafiltro'
                    value={filtro.tipo}
                    onChange={filtrarDietasChange}>
                    <option value="">Todas</option>
                    {dietas.map((e) => <option value={e.toLowerCase()}>{e.toUpperCase()}</option>)}

                </select>
            </form>
            <form onSubmit={onSubmitForm}>
                <input type='search' name="busquedaInp" value={busqueda} onChange={handleInputChange} /> <button type="submit">Search</button>
            </form>
            <form>
                <label>Ordenar por:</label>
                <select name='tipo'
                    value={filtro.tipo}
                    onChange={obtenerInformacion}>
                    <option value="title">name</option>
                    <option value="spoonacularScore">score</option>
                    <option value="healthScore">healthScore</option>

                </select>
                <select name='orden'
                    value={filtro.orden}
                    onChange={obtenerInformacion}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </form>
        </div>
    );
}

export default FormularioFiltro;