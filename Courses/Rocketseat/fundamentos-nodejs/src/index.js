const express = require("express");
const { v4: uuidV4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => {
    return customer.cpf === cpf;
  });

  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "Customer already exists" });
  }

  customers.push({
    id: uuidV4(),
    cpf,
    name,
    statement: [],
  });

  return res.status(201).send(customers);
});

app.get("/statment", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    createAt: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send(statementOperation);
});

app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;

  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  const statementOperation = {
    amount,
    createAt: new Date(),
    type: "debit",
  }

  customer.statement.push(statementOperation);

  return res.status(201).send(statementOperation);
});

app.get("/statment/date", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement) => {
    return statement.createAt.toDateString() === new Date(dateFormat).toDateString()
  })


  return res.status(200).json(statement);
});

app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body
  const { customer } = req;

  customer.name = name;

  return res.status(201).json(customer);
})

app.get("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json(customer);
})

app.delete("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customers.indexOf(customer), 1);

  return res.status(200).send(customers);
})

app.get("/balance", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.status(200).json({ balance });
})

app.listen(3333, () => {
  console.log("listening");
});
