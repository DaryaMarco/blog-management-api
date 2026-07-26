const dns = require("dns");

const resolver = new dns.Resolver();

resolver.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

resolver.resolveSrv(
    "_mongodb._tcp.cluster0.ip0pquw.mongodb.net",
    (err, records) => {
        if (err) {
            console.log("DNS Error:");
            console.log(err);
            return;
        }

        console.log("DNS Success:");
        console.log(records);
    }
);