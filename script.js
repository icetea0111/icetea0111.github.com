/*
	RESUME
	2016.01
	@icetea0111
*/
!function($, window) {
	$(function() {
		resume.init();
		resume.rateView();
	});

	var $markup = $('#markupList'); 
	var resume = {				
		init : function() {
			var $sort = $('#sorting')
			,	$sortTxt = $sort.find('button')
			,	$sortLink = $sort.find('a').not('.index')
			,	sortGrp = []
			,	dev_work = []
			,	$mask = $('.mask');

			for (i=0; i<$sortTxt.length; i++) {
				sortGrp.push($sortTxt.eq(i).attr('data-sort'));
			}

			$markup.find('li').each(function() {
				for ( i=0; i<$sortTxt.length; i++) {
					if ($(this).find('.type').text() == $sortTxt.eq(i).text()) {
						$(this).attr('data-type',sortGrp[i]);
					}
				}
			});
			
			$('<i class="fa fa-angle-up"></i>').appendTo($markup.find('h1'));
			$markup.find('h2').each(function() {
				if ($(this).next('ul').size() > 0) {
					$('<i class="fa fa-list"></i>').prependTo($(this));
				}
			});
				
			$('<i class="fa fa-anchor"></i>').appendTo($markup.find('.summary a'));
			$('<i class="fa fa-pencil"></i>').appendTo($markup.find('.summary button'));

			/*	
			for (k=0; k<$('.worker').find('li').size()+1; k++) {
				dev_work[k] = $markup.find('li[data-dev=dev' + k + ']').size();
				$('<span></span>').appendTo($sortTxt.filter('[data-sort=dev' + k + ']')).text('(' + dev_work[k] + ')');
			}
			*/

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

			$('.show-history').click(function() {
				$('html,body').addClass('freeze');
				$mask
					.show()
					.click(function() {
						$('.history').removeClass('show');
						$(this).hide();
						$('html,body').removeClass('freeze');
					});

				$(this).parents('li').find('.history').addClass('show');

			});

			$sortLink.click(function(e) {
				e.preventDefault();
				$($(this).attr('href')).addClass('show');
				$('.close-content').click(function() {
					$(this).parent('.content').removeClass('show');
				});
			});

			$markup.find('h1').click(function() {
				$(this).toggleClass('close').nextUntil('h1').slideToggle(100);
			});
			$sort.find('a').click(function() {
				//$(this).toggleClass('close').nextUntil('a').not('.remote').slideToggle(100);
			});

			$sortTxt.click(function() {
				var sortBy = $(this).attr('data-sort');
				$markup.removeClass('hide')
					.find('li').removeClass('sort')
					.find('h2').removeClass('sort');
				
				if (!$(this).hasClass('sort')) {
					if (sortBy == 'all') {
						$markup.removeClass('hide');
						$markup.find('li').removeClass('sort');
					}
					else {
						$markup.addClass('hide');
						$markup.find('li').each(function() {
							if($(this).attr('data-type') == sortBy) {
								$(this).parent().prev('h2').addClass('sort');
								$(this).addClass('sort');
							}	
						});
					}
				}
				$(this).toggleClass('sort').parent().siblings().children().removeClass('sort');
				
			});
		},		
		rateView : function() {
			var $total = $('#totalCount')
			,	total_count = parseInt($markup.find('li').size());

			var response_count = parseInt($markup.find('li[data-type=response]').size())
			,	mobile_count = parseInt($markup.find('li[data-type=mobile]').size())
			,	access_count = parseInt($markup.find('li[data-type=access]').size())
			,	consult_count = parseInt($markup.find('li[data-type=consult]').size());
			
			var response_rate = Math.floor((response_count / total_count) * 100) + '%'
			,	mobile_rate = Math.floor((mobile_count / total_count) * 100) + '%'
			,	access_rate = Math.floor((access_count / total_count) * 100) + '%'
			,	consult_rate = Math.floor((consult_count / total_count) * 100) + '%';
			
			$total.find('h1').text(total_count);
			$('.response-count').text(response_rate).css('width',response_rate);
			$('.mobile-count').text(mobile_rate).css('width',mobile_rate);
			$('.access-count').text(access_rate).css('width',access_rate);
			$('.consult-count').text(consult_rate).css('width',consult_rate);
		}

	}
}(window.jQuery, window);