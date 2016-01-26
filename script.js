/*
	Markup index for Frontend
	ver 1.0
	@icetea0111
*/

!function($, window) {
	
	var $markup = $('#markupList');

	var player = {
		init : function() {
			var	$sort = $('#sorting')
			,	$sortTxt = $sort.find('button')
			,	sortGrp = []
			,	dev_work = [];

			for (i=0; i<$sortTxt.length; i++) {
				sortGrp.push($sortTxt.eq(i).attr('data-sort'));
			}
			
			$markup.find('li').each(function() {
				for ( i=0; i<$sortTxt.length; i++) {
					if ($(this).find('.type').text() == $sortTxt.eq(i).text()) {
						$(this).attr('data-type',sortGrp[i]);
					}
					if ($(this).find('.status').text() == $sortTxt.eq(i).text()) {
						$(this).attr('data-status',sortGrp[i]);
					}
					if ($(this).find('.dev').text() == $sortTxt.eq(i).text()) {
						$(this).attr('data-dev',sortGrp[i]);
						//$(this).find('.dev').html($sortTxt.eq(i).find('i'))
					}
				}
			});
			
			$('<i class="fa fa-angle-up"></i>').appendTo($markup.find('h1'));
			$markup.find(':header').not('h1').each(function() {
				if ($(this).next('ul').size() > 0) {
					$('<i class="fa fa-list"></i>').prependTo($(this));
				}
			});
				
			$('<i class="fa fa-link"></i>').appendTo($markup.find('a'));
			$markup.find('li[data-status=issue] .status').html('<i class="fa fa-bug"></i>');
			//$('<i class="fa fa-bug"></i>').prependTo($markup.find('li[data-status=issue] .status'));
			
				
			for (k=0; k<$('.worker').find('li').size()+1; k++) {
				dev_work[k] = $markup.find('li[data-dev=dev' + k + ']').size();
				$('<span></span>').appendTo($sortTxt.filter('[data-sort=dev' + k + ']')).text('(' + dev_work[k] + ')');
			}

			$markup.find('li[data-status=issue] .status').on('click', function() {
				alert($(this).attr('title'));
			});
			
			$markup.find('h1').click(function() {
				$(this).toggleClass('close').nextUntil('h1').slideToggle(100);
			});
			$sort.find('h1').click(function() {
				$(this).toggleClass('close').nextUntil('h1').not('.remote').slideToggle(100);
			});
			
			$sortTxt.click(function() {
				var sortBy = $(this).attr('data-sort');
				$markup.removeClass('hide').find('li').removeClass('sort');
				
				if (!$(this).hasClass('sort')) {
					if (sortBy == 'all') {
						$markup.removeClass('hide');
						$markup.find('li').removeClass('sort');
					}
					else {
						$markup.addClass('hide');
						$markup.find('li').each(function() {
							if($(this).attr('data-type') == sortBy || $(this).attr('data-status') == sortBy || $(this).attr('data-dev') == sortBy ) {
								$(this).addClass('sort');
							}	
						});
					}
				}
				$(this).toggleClass('sort').parent().siblings().children().removeClass('sort');	
			});

			$('.toggler').click(function() {
				$sort.toggleClass('show');
			});
			$('.collapse').click(function() {
				$markup.find('h1').removeClass().addClass('close').nextUntil('h1').hide();
			});
			$('.collapse-off').click(function() {
				$markup.find('h1').removeClass().nextUntil('h1').show();
			});
			
			$('.collapse').trigger('click');

		},

		status : function() {
			var $total = $('#totalCount')
			,	total_count = parseInt($markup.find('li').size())
			,	complete_count = parseInt($markup.find('li[data-status=complete]').size())
			,	issue_count = parseInt($markup.find('li[data-status=issue]').size())
			,	work_count = parseInt($markup.find('li[data-status=work]').size())
			,	wait_count = parseInt($markup.find('li[data-status=wait]').size())			
			,	complete_rate = Math.floor((complete_count / total_count) * 100) + '%'
			,	issue_rate = Math.floor((issue_count / total_count) * 100) + '%'
			,	work_rate = Math.floor((work_count / total_count) * 100) + '%'
			,	wait_rate = Math.floor((wait_count / total_count) * 100) + '%';
			
			$total.find('h1').text(complete_count + '/' + total_count);
			$('.complete-count').text(complete_rate).css('width',complete_rate);
			$('.issue-count').text(issue_rate).css('width',issue_rate);
			$('.work-count').text(work_rate).css('width',work_rate);
			$('.wait-count').text(wait_rate).css('width',wait_rate);
		}
	}

	$(function() {
		player.init();
		player.status();
	});	

}(window.jQuery, window);