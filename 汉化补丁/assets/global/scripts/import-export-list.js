
function importList(tabNum) {

	var fileInput = document.getElementById('import-frame');
	var file = fileInput.files[0];
	var textType = /text.*/;
	if (typeof tabNum === 'undefined') { tabNum = 0; }
		
	if (tabNum == 0) {
	
		if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
			
				var importArray = reader.result.split("\n");
				$.each(importArray, function(i, line) {

					var formattedUrl = extractDomain(line.replace(/[^A-Za-z0-9\-.]/gi, '')).toLowerCase();
					
					if (verIsPro) {
						formattedUrl = extractDomain(line.replace(/[^A-Za-z0-9\*\-.]/gi, '')).toLowerCase();
					}
					
					if (formattedUrl.localeCompare('null') != 0 ) {			
						if ($("#var-list-sites option[value='" + formattedUrl + "']").length < 1) {
							$("#var-list-sites").append('<option value="' + formattedUrl + '">' + formattedUrl + '</option>');
							
						}
					}
				});
				var options = $("#var-list-sites option");
				var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
				arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
				options.each(function(i, o) {
					o.value = arr[i].v;
					$(o).text(arr[i].t);
				});					
				
			}
			reader.readAsText(file);  
		} 	
		
	} else if (tabNum == 1) {
	
		if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
			
				var importArray = reader.result.split("\n");
				$.each(importArray, function(i, line) {

					var formattedApp = line.split(",");
										
					if (formattedApp[0].localeCompare('') != 0 && formattedApp[1].localeCompare('') != 0 ) {			
						if ($("#var-list-apps option[value='" + formattedApp[0] + "']").length < 1) {
							$("#var-list-apps").append('<option value="' + formattedApp[0] + '">' + formattedApp[1] + '</option>');
						}
					}				
				
				});					
				var options = $("#var-list-apps option");
				var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
				arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
				options.each(function(i, o) {
					o.value = arr[i].v;
					$(o).text(arr[i].t);
				});
			}
			reader.readAsText(file);  
		} 	
		
	} else if (tabNum == 2) {
	
		if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
			
				var importArray = reader.result.split("\n");
				$.each(importArray, function(i, line) {

					var formattedUrl = extractDomain(line.replace(/[^A-Za-z0-9\-.]/gi, '')).toLowerCase();
					
					if (verIsPro) {
						formattedUrl = extractDomain(line.replace(/[^A-Za-z0-9\*\-.]/gi, '')).toLowerCase();
					}
					
					if (formattedUrl.localeCompare('null') != 0 ) {			
						if ($("#var-list-excepts option[value='" + formattedUrl + "']").length < 1) {
							$("#var-list-excepts").append('<option value="' + formattedUrl + '">' + formattedUrl + '</option>');
							
						}
					}
				});					
				var options = $("#var-list-excepts option");
				var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
				arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
				options.each(function(i, o) {
					o.value = arr[i].v;
					$(o).text(arr[i].t);
				});	
			}
			reader.readAsText(file);  
		} 	
		
	}
		
}

function exportList(tabNum) {

	var content = '';
	var data = '';
	if (typeof tabNum === 'undefined') { tabNum = 0; }
	
	if (tabNum == 0) {

		var options = $("#var-list-sites option");
		options.each(function(i, o) {
			content = content + o.value + "<br>";
		});
		
		var iframe = document.getElementById('download-frame');
		iframe = iframe.contentWindow || iframe.contentDocument;
		iframe.document.open("text/html", "replace");
		iframe.document.write(content);
		iframe.document.close();
		iframe.focus();
		iframe.document.execCommand('SaveAs', true, 'Cold-Turkey-Export-Sites.txt');
		
		/* This is busted in IE...

			data = 'data:application/text;charset=utf-8,' + encodeURIComponent(content);
			
			$(this).attr({
				'download': 'Cold-Turkey-List.txt',
				'href': data,
				'target': '_blank'
			});
			
		*/
		
	} else if (tabNum == 1) {
	
		var options = $("#var-list-apps option");
		options.each(function(i, o) {
			content = content + o.value + "," + o.text + "<br>";
		});
		
		var iframe = document.getElementById('download-frame');
		iframe = iframe.contentWindow || iframe.contentDocument;
		iframe.document.open("text/html", "replace");
		iframe.document.write(content);
		iframe.document.close();
		iframe.focus();
		iframe.document.execCommand('SaveAs', true, 'Cold-Turkey-Export-Apps.txt');		
		
	} else if (tabNum == 2) {
	
		var options = $("#var-list-excepts option");
		options.each(function(i, o) {
			content = content + o.value + "<br>";
		});
		
		var iframe = document.getElementById('download-frame');
		iframe = iframe.contentWindow || iframe.contentDocument;
		iframe.document.open("text/html", "replace");
		iframe.document.write(content);
		iframe.document.close();
		iframe.focus();
		iframe.document.execCommand('SaveAs', true, 'Cold-Turkey-Export-Exceptions.txt');
		
	}
		
}

function addList(listNum, tabNum) {

	var list = [
		["facebook.com","twitter.com","netflix.com","collegehumor.com","imgur.com","youtube.com","vimeo.com","buzzfeed.com","mashable.com","ebay.com","amazon.com","9gag.com","4chan.org","reddit.com","tumblr.com","pinterest.com","instagram.com","flickr.com","deviantart.com","stumbleupon.com","myspace.com","tagged.com","orkut.com","delicious.com"],
		["xvideos.com","xhamster.com","pornhub.com","xnxx.com","redtube.com","youporn.com","tube8.com","youjizz.com","hardsextube.com","beeg.com","motherless.com","drtuber.com","nuvid.com","pornerbros.com","spankwire.com","keezmovies.com","sunporno.com","porn.com","4tube.com","alphaporno.com","xtube.com","pornoxo.com","yobt.com","tnaflix.com","pornsharia.com","brazzers.com","extremetube.com","slutload.com","fapdu.com","empflix.com","alotporn.com","vid2c.com","shufuni.com","cliphunter.com","xxxbunker.com","madthumbs.com","deviantclip.com","twilightsex.com","pornhost.com","fux.com","jizzhut.com","spankbang.com","eporner.com","orgasm.com","yuvutu.com","kporno.com","definebabe.com","shooshtime.com","mofosex.com","hotgoo.com","submityourflicks.com","xxx.com","bigtits.com","media.xxxaporn.com","bonertube.com","userporn.com","jizzonline.com","pornotube.com","fookgle.com","free18.net","tub99.com","nonktube.com","mastishare.com","tjoob.com","rude.com","bustnow.com","pornrabbit.com","pornative.com","sluttyred.com","boysfood.com","moviefap.com","lubetube.com","submityourtapes.com","megafilex.com","hdpornstar.com","al4a.com","stileproject.com","xogogo.com","filthyrx.com","jizzbo.com","5ilthy.com","91porn.com","lesbianpornvideos.com","eroxia.com","iyottube.com","yourfreeporn.us","sexoasis.com","fucktube.com","pornomovies.com","clearclips.com","moviesand.com","tubixe.com","pornjog.com","sextv1.pl","desihoes.com","pornupload.com","kosimak.com","videocasalinghi.com","lubeyourtube.com","freudbox.com","moviesguy.com","motherofporn.com","141tube.com","my18tube.com","bigupload.com xvds.com","fastjizz.com","tubeland.com","ultimatedesi.net","teenporntube.com","tubave.com","afunnysite.com","sexe911.com","megaporn.com","porntitan.com","pornheed.com","youhot.gr","videolovesyou.com","onlymovies.com","hdporn.net","adultvideodump.com","suzisporn.com","xfilmes.tv","pornwall.com","silverdaddiestube.com","sweetcollegegirls.com","ipadporn.com","youporns.org","movietitan.com","yaptube.com","jugy.com","chumleaf.com","panicporn.com","milfporntube.com","timtube.com","wetpussy.com","whoreslag.com","xfapzap.com","xvideohost.com","tuberip.com","dirtydirtyangels.com","bigerotica.com","pk5.net","theamateurzone.info","triniporn.org","youbunny.com","isharemybitch.com","morningstarclub.com","sexkate.com","kuntfutube.com","porncor.com","thegootube.com","tubeguild.com","fuckuh.com","tube.smoder.com","zuzandra.com","nextdoordolls.com","myjizztube.com","homesexdaily.com","thetend.com","yourpornjizz.com","tgirls.com","pornwaiter.com","pornhub.pl","nurglestube.com","brazzershdtube.com","upthevideo.com","sexzworld.com","cuntest.com","ahtube.com","free2peek.com","freeamatube.com","thexxxtube.net","yazum.com","tubesexes.com","pornload.com","vankoi.com","dailee.com","ejason21.com","openpunani.com","porntubexl.nl","scafy.com","bangbull.com","vidxnet.com","yteenporn.com","tubethumbs.com","faptv.com","nasty8.com","maxjizztube.com","pornunder.com","24h-porn.net","xclip.tv","jerkersworld.com","desibomma.com","jizzbox.com","theyxxx.com","bonkwire.com","PornTelecast.com","pornsitechoice.com","yporn.tv","girlsongirlstube.com","famouspornstarstube.com","sexfans.org","youpornxl.com","rudeshare.com","efuckt.com","koostube.com","amateursex.com","moviegator.com","cobramovies.com","cantoot.com","yourhottube.com","teentube18.com","youxclip.com","flicklife.com","nastyrat.tv","freepornfox.com","freeadultwatch.com","fucked.tv","sextube.si","pornrater.com","wheresmygf.com","xfanny.com","pornorake.com","untouched.tv","guppyx.com","mylivesex.tv","pervaliscious.com","sex2ube.com","suckjerkcock.com","netporn.nl","exgfvid.com","koalaporn.com","bbhgvidz.com","evilhub.com","celebritytubester.com","pornfish.com","jrkn.com","bootyclips.com","tubeguide.info","realhomemadetube.com","tokenxxxporn.com","pornvideoflix.com","sinfultube.net","pornler.com","sharexvideo.com","69youPorn.com","submitmyvideo.com","kastit.com","pornini.com","hd4sex.com","laftube.com","mosestube.com","dutchxtube.com","porncastle.net","tubedatbooty.com","pornvie.com","pornopantry.com","springbreaktubegirls.com","tube4u.net","nsfwftw.com","pornozabava.com","tgutube.com","celebritynudez.com","teeztube.com","collegefucktube.com","adultvideomate.com","porntubemoviez.com","bigjuggs.com","hornypickle.com","mypornow.com","pushingpink.com","xxxshare.ru","nuuporn.com","melontube.com","myamateurporntube.com","soyouthinkyourapornstar.com","porntubestreet.com","pornogoddess.com","cumsnroses.com","porntubeclipz.com","lcgirls.com","housewifes.com","cactarse.com","cumfox.com","tube17.com","teenbrosia.com","lesbiantubemovies.com","xxxset.com","gagahub.com","jugland.com","porntubesurf.com","freakybuddy.com","sexdraw.com","sexovirtual.com","pornsmack.com","gratisvideokijken.nl","eroticadulttube.com","bharatporn.com","fmeporn.com","darkpost.com","sexporndump.com","sexandporn.org","jezzytube.com","justpornclip.com","xxxpornow.com","inseks.com","freeporn777.com","porndisk.com","adultfunnow.com","youporn.us.com","babecumtv.com","girlskissinggirlsvideos.com","specialtytubeporn.com","teentube.be","free-celebrity-tube.com","public-sluts.net"],
		["hidemyass.com","proxify.com","hide.me","proxfree.com","proxysite.com","proxsite.com","top-proxies.co.uk","proxy4free.com","vpnbook.com","free-proxyserver.com","cyberghostvpn.com","freeproxy.ca","ninjacloak.com","anonymouse.org","anonymizer.com","kproxy.com","blewpass.com","zendproxy.com","vobas.com","dontfilter.us","vtunnel.com","proxy.org","freeproxy.asia","unblock-proxy.com","publicproxyservers.com","zend2.com","zfreez.com","zenmate.com","uas2.com","megaproxy.com","speedproxyserver.com","englandproxy.co.uk","zippyproxy.com","proxyserver.pk","filterbypass.me","newipnow.com","webproxy.net","4everproxy.com","unblockmyweb.com","youtubeunblockproxy.com","workingproxy.net","freeopenproxy.com","proxy2014.net","unblockyoutubefree.net","freeyoutube.net","rapidproxy.us","unblockyoutubeatschool.com","hidingyour.info","unblocker.us","fastusaproxy.com","youtubefreeproxy.net","proxyo.info","quickproxy.co.uk","defilter.us","freeproxyserver.uk","freeyouproxytube.com","thebestproxy.info","ecxs.asia","justproxy.co.uk","proxy-2014.com","vpnbrowse.com","proxyone.net","webproxyfree.net","cantblockthis.org","hidetheinternet.com","greatestfreeproxy.com","proxay.co.uk","viewyoutube.net","pro-unblock.com","hidemytraxproxy.ca","workingproxy.net","stardollproxy.com","hidemyass.co.uk","f4fp.com","hideme.be","tiafun.com","proxy4freedom.com","websurfproxy.me","fishproxy.com","dzhot.us","1freeproxy.pw","sporium.org","saoudiproxy.info","proxybrowse.info","proxy-internet.info","jezuslovesthisproxy.info","german-proxy.info","caproxies.info","proxy-2015.info","fbproxies.info","americaproxy.info","pkproxy.info","suedeproxy.info","toproxy.co","phproxy.co","londonproxy.eu","krproxy.info","brazilproxy.info","canadaproxy.info","usproxies.info","spedo.co","usproxy.nu","youliaoren.com","zacebookpk.com","proxys.pw","justunblockit.com","networkbypass.com","goproxy.asia","proxythis.info","mehide.asia","zalmos.com","kproxysite.com","xitenow.com","hiddendigital.info","surf-for-free.com","interncloud.info","singaporeproxy.nu","prointern.info","fasttime.info","workhost.eu","travelvpn.info","proxmecallmenames.com","hostapp.eu","funproxy.net"]
	];
	var importArray = list[listNum];
	if (typeof tabNum === 'undefined') { tabNum = 0; }
	
	if (tabNum == 0) {
	
		$.each(importArray, function(i, line) {
			if (line.localeCompare('null') != 0 ) {			
				if ($("#var-list-sites option[value='" + line + "']").length < 1) {
					$("#var-list-sites").append('<option value="' + line + '">' + line + '</option>');	
				}
			}				
		
		});	
		var options = $("#var-list-sites option");
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
		});
		
	} else if (tabNum == 2) {
	
		$.each(importArray, function(i, line) {
			if (line.localeCompare('null') != 0 ) {			
				if ($("#var-list-excepts option[value='" + line + "']").length < 1) {
					$("#var-list-excepts").append('<option value="' + line + '">' + line + '</option>');
				}
			}				
		
		});	
		var options = $("#var-list-excepts option");
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
		});	
	}
		
}

function removeEntry(tabNum) {
	if (tabNum == 0) {
		var e = jQuery.Event("keydown");
		e.which = 8;
		$("#var-list-sites").trigger(e);
	} else if (tabNum == 1) {
		var e = jQuery.Event("keydown");
		e.which = 8;
		$("#var-list-apps").trigger(e);
	} else if (tabNum == 2) {
		var e = jQuery.Event("keydown");
		e.which = 8;
		$("#var-list-excepts").trigger(e);
	}
}