/** @jsx React.DOM */
angular.module('cyb.varer').factory('RåvarerIndexListView', function ($compile, $filter, PrisDato, PrisMargin, VareMengde) {
    return React.createClass({
        render: function () {
            // TODO: filter: ng-repeat="item in raavarer.items|filter:raavarer.varefilter"
            return (
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>Betegnelse</th>
                            <th>Mengde</th>
                            <th>Pris eks mva</th>
                            <th>Internpris</th>
                            <th>Eksternpris</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itemsfiltered.map(function (item) {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        {item.kategori ? item.kategori + ': ' : ''}
                                        <a href={'varer/råvarer/'+item.id}>{item.navn}</a>
                                        {item.status != 'OK' ? <span> <span className="status-text">{item.status}</span></span> : ''}
                                        <br/>
                                        <a className="gruppe-link" href={'varer/kontoer/'+item.innkjopskonto.id}>{item.innkjopskonto.gruppe}: {item.innkjopskonto.navn}</a>
                                    </td>
                                    <td>
                                        <VareMengde verdi={item.mengde} enhet={item.enhet} />
                                        {item.antall != 1 ? <span className="vare-antall"><br />
                                            ({item.antall} stk)
                                        </span> : ''}
                                        {item.mengde_svinn ? <span className="svinn-info"><br/>
                                            ca. <VareMengde verdi={item.mengde_svinn} enhet={item.enhet} /> = svinn
                                        </span> : ''}
                                    </td>
                                    <td>
                                        {item.innpris ?
                                            <span>
                                                {$filter('price')(item.innpris.pris)}<br/>
                                                <PrisDato dato={item.innpris.dato} />
                                            </span> : ''}
                                    </td>
                                    <td>
                                        {item.salgspris ?
                                            (item.salgspris.pris_intern ?
                                                <span>
                                                    <a href={'admin/varer/salgsvare/'+item.salgspris.id+'/'} target="_self">{$filter('price')(item.salgspris.pris_intern, 0)}</a>
                                                    {item.innpris ?
                                                        <span>
                                                            <br/>
                                                            <PrisMargin innPris={item.innpris.pris} utPris={item.salgspris.pris_intern} utMva={item.salgspris.mva} />
                                                        </span> : ''}
                                                </span> : 'Se ekstern')
                                            : ''}
                                    </td>
                                    <td>
                                        {item.salgspris ?
                                            (item.salgspris.pris_ekstern ?
                                                <span>
                                                    <a href={'admin/varer/salgsvare/'+item.salgspris.id+'/'} target="_self">{$filter('price')(item.salgspris.pris_ekstern, 0)}</a>
                                                    {item.innpris ?
                                                        <span>
                                                            <br/>
                                                            <PrisMargin innPris={item.innpris.pris} utPris={item.salgspris.pris_ekstern} utMva={item.salgspris.mva} />
                                                        </span> : ''}
                                                </span> : 'Ikke salg')
                                            : ''}
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>);
        }
    });
});
