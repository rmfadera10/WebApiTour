var chai =require('chai')
var chaiHttp=require('chai-http');
var should=chai.should()

chai.use(chaiHttp);
var server = require('../app.js')

describe ("Users", function(){
describe('POST user registration test', function(){
    it('it should register a single user, provided username is unique and password is entered',function(done){
        chai.request(server)
            .post('/registration')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                username:'fadera',
                password:'fadera',
                addres:'ktm'

            })
            .end(function(err, res){
                res.should.have.status(201);
                res.body.should.have.property('message').eql('You have been is registered successfully')
            })
    })

})

})