import React from 'react';
import $ from 'jquery';

function reloadJs(src) {
	if (!process.browser) return;
	$(`script[src="${src}"]`).remove();
	$('<script>')
		.attr('src', src)
		.appendTo('head');
}

const versaTagSrc = 'https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js';
let prevPathname = '';
let prevSearch = '';
let mounted;
const VersaTag = ({ pathname, search }) => {
	// In GTM, the administrator opens the account and creates a new tag.
	// The administrator names the tag VersaTag and selects Custom HTML for the tag type.
	// The administrator pastes the VersaTag code, provided by Sizmek, into the HTML box.
	// The administrator selects the Support document.write check box.
	// The administrator selects the default All Pages trigger in the Triggering section.
	const versaTag = {};
	versaTag.id = '[SET-VERSA-TAG-ID]';
	versaTag.sync = 0;
	versaTag.dispType = 'js';
	versaTag.ptcl = 'HTTPS';
	versaTag.bsUrl = 'bs.serving-sys.com/BurstingPipe';
	// VersaTag activity parameters include all conversion parameters including custom parameters and Predefined parameters. Syntax: "ParamName1":"ParamValue1", "ParamName2":"ParamValue2". ParamValue can be empty.
	versaTag.activityParams = {
		// Predefined parameters:
		Session: '',
		// Custom parameters:
	};
	// Static retargeting tags parameters. Syntax: "TagID1":"ParamValue1", "TagID2":"ParamValue2". ParamValue can be empty.
	versaTag.retargetParams = {};
	// Dynamic retargeting tags parameters. Syntax: "TagID1":"ParamValue1", "TagID2":"ParamValue2". ParamValue can be empty.
	versaTag.dynamicRetargetParams = {};
	// Third party tags conditional parameters and mapping rule parameters. Syntax: "CondParam1":"ParamValue1", "CondParam2":"ParamValue2". ParamValue can be empty.
	versaTag.conditionalParams = {};

	// probably could make the timing work here with hooks, but this component is simple and only mounts once, so i'm just using closure vars
	if (mounted) {
		// dont record shop redirects
		if (pathname === '/shop') return null;
		const previous = `${prevPathname}${prevSearch}`;
		const current = `${pathname}${search}`;
		// dont record fullMenu redirects
		const isFullMenuRedirect = previous === current.replace('fullMenu=false', '').replace('?', '');
		if (isFullMenuRedirect) return null;
		if (prevSearch === search && prevPathname === pathname) return null;
		reloadJs(versaTagSrc);
	} else {
		mounted = true;
	}
	prevPathname = pathname;
	prevSearch = search;
	return (
		<>
			<noscript>
				<iframe
					src='https://bs.serving-sys.com/BurstingPipe?
cn=ot&amp;
onetagid=${versaTag.id}&amp;
ns=1&amp;
activityValues=$$Session=[Session]$$&amp;
retargetingValues=$$$$&amp;
dynamicRetargetingValues=$$$$&amp;
acp=$$$$&amp;'
					style={{ display: 'none', width: '0px', height: '0px' }}
				/>
			</noscript>
		</>
	);
};
export default React.memo(VersaTag);
