module.exports = function (review) {
	return {
		content: review.content,
		author: review.author.login ?? review.author,
	}
}
