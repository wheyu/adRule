const request  = require('superagent')
const cheerio = require('cheerio')


const params1 = {
	info:'1111111111',
	name: 'tempName'
}
//返回router1
/*
request
.get('http://127.0.0.1:3002/')
.send(params1)
.end(function(err, res){
	if(err) {
		console.log('***  err ',err)
		return
	}
	console.log('****  ',res.text)
})
*/

const params2 = {
	info:'22222222',
	name: '123'
}
//返回router2
request
.get('http://127.0.0.1:3002/users/wheyu')
.send(params2)
.end(function(err, res){
	if(err) {
		console.log('***  err ',err)
		return
	}
	console.log('****  ',res.text)
})


request['get']('http://127.0.0.1:3002/')
.send(params1)
.end(function(err, res){
	if(err) {
		console.log('***  err ',err)
		return
	}
	console.log('****  ',res.text)
})







return

let content = '';
let imgs = [];

request
    .get('https://www.cnblogs.com/')
    .end(function(err, res){
		if(err) {
			console.log('***** err  ',err)
			return
		}
		let $ = cheerio.load(res.text);
		$('#post_list .post_item').each( (index,element) => {
			let temp = {

			  'title' : $(element).find('h3 a').text(),

			  'author' : $(element).find('.post_item_foot > a').text(),

			  'readNum' : +$(element).find('.article_view a').text().slice(3,-2),

			  'tuijian' : +$(element).find('.diggnum').text()

			}

			//拼接数据

			content += JSON.stringify(temp) + '\n';

			//同样的方式获取图片地址

			if($(element).find('img.pfs').length > 0){

			  imgs.push($(element).find('img.pfs').attr('src'));

			}

		});
		console.log('**************  ', content)
    })