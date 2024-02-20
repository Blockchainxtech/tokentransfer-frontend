import React from "react";


export class Content extends React.Component {

  render() {
    return (
      <><section className="transfer-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box">
                            <div className="main-heading"><h1>Token Transfer Platform</h1></div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div class="form-floating">
                                        <select class="form-control form-select" id="floatingTokens" aria-label="Tokens">
                                            <option selected>oX5e27c...953af96</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <label for="floatingTokens">Test Tokens</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingWallet" placeholder="Wallet Address" />
                                        <label for="floatingWallet">Wallet Address</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="floatingAmount" placeholder="Amount" />
                                        <label for="floatingAmount">Amount</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary connect-wallet">Transfer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="transfer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="main-heading"><h1>Transaction Logs</h1></div>

                  <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Txn hash</th>
                                    <th>Method</th>
                                    <th>User Name</th>
                                    <th>Block</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Gas fee</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td><button>Signup</button></td>
                                    <td>ABC</td>
                                    <td>-</td>
                                    <td>19/02/2024 Monday</td>
                                    <td>1:22:04 PM</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>oX5e27c...953af96</td>
                                    <td>-</td>
                                    <td><button>View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>              






                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    );
  }
}

