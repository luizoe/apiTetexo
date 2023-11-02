const expect = require("chai").expect;
const request = require("request");
const config = require('config');
const url = `http://localhost:${config.get('webserver.port')}`;


describe("get /awards/winners", () => {
    let successData = {
        "min": [
            {
                "producer": "Joel Silver",
                "interval": 1,
                "previousWin": 1990,
                "followingWin": 1991
            }
        ],
        "max": [
            {
                "producer": "Matthew Vaughn",
                "interval": 13,
                "previousWin": 2002,
                "followingWin": 2015
            }
        ]
    };
    const totalRequestSuccess = 12;
    let requestsDone = 0;
    it("return status 200", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            expect(resp.statusCode).to.equal(200);            
            done();
        });
    });
    it("check 'responseData.min' is an array", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min).to.instanceOf(Array);
            done();
        });
    });
    it("check 'responseData.max' is an array", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.max).to.instanceOf(Array);
            done();
        });
    });
    it("check 'responseData.min[0].interval' is the small or equals to 'responseData.max[0].interval'", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min[0].interval).to.lessThanOrEqual(successData.max[0].interval);
            done();
        });
    });
    // MIN index, test
    it("check 'responseData.min[0].producer' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min[0].producer).to.equal(successData.min[0].producer);
            done();
        });
    });
    it("check 'responseData.min[0].interval' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min[0].interval).to.equal(successData.min[0].interval);
            done();
        });
    });
    it("check 'responseData.min[0].previousWin' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min[0].previousWin).to.equal(successData.min[0].previousWin);
            done();
        });
    });
    it("check 'responseData.min[0].followingWin' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.min[0].followingWin).to.equal(successData.min[0].followingWin);
            done();
        });
    });
    // MAX index, test
    it("check 'responseData.max[0].producer' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.max[0].producer).to.equal(successData.max[0].producer);
            done();
        });
    });
    it("check 'responseData.max[0].interval' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.max[0].interval).to.equal(successData.max[0].interval);
            done();
        });
    });
    it("check 'responseData.max[0].previousWin' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.max[0].previousWin).to.equal(successData.max[0].previousWin);
            done();
        });
    });
    it("check 'responseData.max[0].followingWin' is the same as our sample", (done) => {
        request(url+"/awards/winners", (err, resp, body) => {
            requestsDone++;
            const responseData = JSON.parse(body);
            expect(responseData.max[0].followingWin).to.equal(successData.max[0].followingWin);
            done();
        });
    });
    it(`check max requests done, MAX: ${totalRequestSuccess}`, (done) => {
        expect(totalRequestSuccess).to.equal(requestsDone);
        done();
    });
});