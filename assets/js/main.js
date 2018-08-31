

				$('[data-rel=tooltip]').tooltip();
				$('[data-rel=popover]').popover({html:true});

					jQuery(function($){
					    var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox({infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>'});
						var container1 = demo1.bootstrapDualListbox('getContainer');
						container1.find('.btn').addClass('btn-white btn-info btn-bold');

						/**var setRatingColors = function() {
							$(this).find('.star-on-png,.star-half-png').addClass('orange2').removeClass('grey');
							$(this).find('.star-off-png').removeClass('orange2').addClass('grey');
						}*/
						$('.rating').raty({
							'cancel' : true,
							'half': true,
							'starType' : 'i'
							/**,

							'click': function() {
								setRatingColors.call(this);
							},
							'mouseover': function() {
								setRatingColors.call(this);
							},
							'mouseout': function() {
								setRatingColors.call(this);
							}*/
						})//.find('i:not(.star-raty)').addClass('grey');



						//////////////////
						//select2
						$('.select2').css('width','200px').select2({allowClear:true})
						$('#select2-multiple-style .btn').on('click', function(e){
							var target = $(this).find('input[type=radio]');
							var which = parseInt(target.val());
							if(which == 2) $('.select2').addClass('tag-input-style');
							 else $('.select2').removeClass('tag-input-style');
						});

						//////////////////
						$('.multiselect').multiselect({
						 enableFiltering: true,
						 enableHTML: true,
						 buttonClass: 'btn btn-white btn-primary',
						 templates: {
							button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
							ul: '<ul class="multiselect-container dropdown-menu"></ul>',
							filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
							filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
							li: '<li><a tabindex="0"><label></label></a></li>',
					        divider: '<li class="multiselect-item divider"></li>',
					        liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
						 }
						});


						///////////////////

						//typeahead.js
						//example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
						var substringMatcher = function(strs) {
							return function findMatches(q, cb) {
								var matches, substringRegex;

								// an array that will be populated with substring matches
								matches = [];

								// regex used to determine if a string contains the substring `q`
								substrRegex = new RegExp(q, 'i');

								// iterate through the pool of strings and for any string that
								// contains the substring `q`, add it to the `matches` array
								$.each(strs, function(i, str) {
									if (substrRegex.test(str)) {
										// the typeahead jQuery plugin expects suggestions to a
										// JavaScript object, refer to typeahead docs for more info
										matches.push({ value: str });
									}
								});

								cb(matches);
							}
						 }

						 $('input.typeahead').typeahead({
							hint: true,
							highlight: true,
							minLength: 1
						 }, {
							name: 'states',
							displayKey: 'value',
							source: substringMatcher(ace.vars['US_STATES']),
							limit: 10
						 });


						///////////////


						//in ajax mode, remove remaining elements before leaving page
						$(document).one('ajaxloadstart.page', function(e) {
							$('[class*=select2]').remove();
							$('select[name="duallistbox_demo1[]"]').bootstrapDualListbox('destroy');
							$('.rating').raty('destroy');
							$('.multiselect').multiselect('destroy');
						});

					});




			jQuery(function($) {
				$('.easy-pie-chart.percentage').each(function(){
					var $box = $(this).closest('.infobox');
					var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
					var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
					var size = parseInt($(this).data('size')) || 50;
					$(this).easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: parseInt(size/10),
						animate: ace.vars['old_ie'] ? false : 1000,
						size: size
					});
				})

				$('.sparkline').each(function(){
					var $box = $(this).closest('.infobox');
					var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
					$(this).sparkline('html',
									 {
										tagValuesAttribute:'data-values',
										type: 'bar',
										barColor: barColor ,
										chartRangeMin:$(this).data('min') || 0
									 });
				});


				var d1 = [];
				for (var i = 0; i < Math.PI * 2; i += 0.5) {
					d1.push([i, Math.sin(i)]);
				}

				var d2 = [];
				for (var i = 0; i < Math.PI * 2; i += 0.5) {
					d2.push([i, Math.cos(i)]);
				}

				var d3 = [];
				for (var i = 0; i < Math.PI * 2; i += 0.2) {
					d3.push([i, Math.tan(i)]);
				}


				var sales_charts = $('#sales-charts').css({'width':'100%' , 'height':'220px'});
				$.plot("#sales-charts", [
					{ label: "Domains", data: d1 },
					{ label: "Hosting", data: d2 },
					{ label: "Services", data: d3 }
				], {
					hoverable: true,
					shadowSize: 0,
					series: {
						lines: { show: true },
						points: { show: true }
					},
					xaxis: {
						tickLength: 0
					},
					yaxis: {
						ticks: 10,
						min: -2,
						max: 2,
						tickDecimals: 3
					},
					grid: {
						backgroundColor: { colors: [ "#fff", "#fff" ] },
						borderWidth: 1,
						borderColor:'#555'
					}
				});


				$('#recent-box [data-rel="tooltip"]').tooltip({placement: tooltip_placement});
				function tooltip_placement(context, source) {
					var $source = $(source);
					var $parent = $source.closest('.tab-content')
					var off1 = $parent.offset();
					var w1 = $parent.width();

					var off2 = $source.offset();
					//var w2 = $source.width();

					if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
					return 'left';
				}


				$('.dialogs,.comments').ace_scroll({
					size: 300
			    });


				//Android's default browser somehow is confused when tapping on label which will lead to dragging the task
				//so disable dragging when clicking on label
				var agent = navigator.userAgent.toLowerCase();
				if(ace.vars['touch'] && ace.vars['android']) {
				  $('#tasks').on('touchstart', function(e){
					var li = $(e.target).closest('#tasks li');
					if(li.length == 0)return;
					var label = li.find('label.inline').get(0);
					if(label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation() ;
				  });
				}

				$('#tasks').sortable({
					opacity:0.8,
					revert:true,
					forceHelperSize:true,
					placeholder: 'draggable-placeholder',
					forcePlaceholderSize:true,
					tolerance:'pointer',
					stop: function( event, ui ) {
						//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
						$(ui.item).css('z-index', 'auto');
					}
					}
				);
				$('#tasks').disableSelection();
				$('#tasks input:checkbox').removeAttr('checked').on('click', function(){
					if(this.checked) $(this).closest('li').addClass('selected');
					else $(this).closest('li').removeClass('selected');
				});


				//show the dropdowns on top or bottom depending on window height and menu position
				$('#task-tab .dropdown-hover').on('mouseenter', function(e) {
					var offset = $(this).offset();

					var $w = $(window)
					if (offset.top > $w.scrollTop() + $w.innerHeight() - 100)
						$(this).addClass('dropup');
					else $(this).removeClass('dropup');
				});

			})


			$('#id-input-file-1 , #id-input-file-2').ace_file_input({
					no_file:'No File ...',
					btn_choose:'Choose',
					btn_change:'Change',
					droppable:false,
					onchange:null,
					thumbnail:false //| true | large.
					//whitelist:'gif|png|jpg|jpeg'
					//blacklist:'exe|php'
					//onchange:''
					//
				});
