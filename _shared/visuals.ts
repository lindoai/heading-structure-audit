/**
 * Worker-side visual result renderers.
 *
 * Each function returns a JavaScript string that, when executed in the browser,
 * renders a visual into the #visual-result container based on parsed JSON data.
 *
 * The visual styles are included in visualStyles() and should be added to the page <style>.
 * The visual script is included via visualScript(toolSlug) and should be appended to the page <script>.
 */

export function visualStyles(): string {
  return `.visual-result{margin-bottom:16px;display:none}.visual-result.active{display:block}.view-toggle{display:inline-flex;border:1px solid #303030;border-radius:8px;overflow:hidden;margin-left:12px}.view-toggle button{background:transparent;border:0;color:#a3a3a3;padding:6px 12px;font-size:12px;font-weight:500;cursor:pointer}.view-toggle button.active{background:#262626;color:#fafafa}.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600}.badge-pass{background:#052e16;color:#6ee7b7}.badge-fail{background:#450a0a;color:#fca5a5}.badge-warn{background:#451a03;color:#fcd34d}.badge-info{background:#1e1b4b;color:#a5b4fc}.badge-blue{background:#172554;color:#93c5fd}.badge-purple{background:#2e1065;color:#c4b5fd}.badge-neutral{background:#262626;color:#d4d4d4}.progress-bar{height:8px;border-radius:4px;background:#262626;overflow:hidden}.progress-fill{height:100%;border-radius:4px;transition:width .3s}.fill-green{background:#10b981}.fill-amber{background:#f59e0b}.fill-red{background:#ef4444}.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}.stat-card{background:#0f0f0f;border:1px solid #262626;border-radius:12px;padding:12px}.stat-label{font-size:11px;color:#737373}.stat-value{font-size:18px;font-weight:600;color:#fafafa;margin-top:4px}.og-card{border-radius:16px;overflow:hidden;border:1px solid #262626;background:#171717}.og-card-image{height:200px;background:#262626;display:flex;align-items:center;justify-content:center;overflow:hidden}.og-card-image img{width:100%;height:100%;object-fit:cover}.og-card-body{padding:16px}.og-card-domain{font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:.5px}.og-card-title{font-size:16px;font-weight:600;color:#fafafa;margin-top:6px}.og-card-desc{font-size:13px;color:#a3a3a3;margin-top:6px;line-height:1.5}.heading-tree{list-style:none;padding:0;margin:0}.heading-tree li{display:flex;align-items:center;gap:8px;padding:4px 0}.chain-node{display:flex;align-items:center;gap:10px;padding:8px 0;position:relative}.chain-line{position:absolute;left:18px;top:28px;width:2px;height:calc(100% - 8px);background:#303030}.pill-grid{display:flex;flex-wrap:wrap;gap:6px}.pill{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;background:#262626;color:#e5e5e5}.rules-group{background:#0f0f0f;border:1px solid #262626;border-radius:12px;padding:12px;margin-bottom:8px}.rules-group-title{font-size:12px;color:#a3a3a3;margin-bottom:8px;font-weight:500}.rule-line{display:flex;align-items:center;gap:8px;padding:2px 0;font-size:12px}.rule-line code{color:#d4d4d4}.img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}.img-thumb{border-radius:10px;overflow:hidden;border:1px solid #262626;background:#0f0f0f}.img-thumb img{width:100%;height:80px;object-fit:cover;display:block}.img-thumb-meta{padding:6px 8px;font-size:10px;color:#a3a3a3}.link-table{width:100%;border-collapse:collapse;font-size:12px}.link-table th{text-align:left;padding:6px 8px;color:#737373;border-bottom:1px solid #262626;font-weight:500}.link-table td{padding:6px 8px;border-bottom:1px solid #1a1a1a;color:#d4d4d4;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.summary-block{border-left:2px solid #303030;padding-left:16px;color:#e5e5e5;font-size:14px;line-height:1.7}.summary-bullets{list-style:none;padding:0;margin:12px 0 0}.summary-bullets li{padding:4px 0;font-size:13px;color:#d4d4d4;display:flex;align-items:flex-start;gap:8px}.summary-bullets li::before{content:"";display:block;width:6px;height:6px;border-radius:50%;background:#525252;margin-top:6px;flex-shrink:0}.md-preview{background:#0f0f0f;border:1px solid #262626;border-radius:12px;padding:16px;max-height:320px;overflow-y:auto;font-size:13px;line-height:1.7;color:#e5e5e5}.md-preview h1,.md-preview h2,.md-preview h3{color:#fafafa;margin:16px 0 8px}.md-preview h1{font-size:20px}.md-preview h2{font-size:17px}.md-preview h3{font-size:15px}.md-preview a{color:#60a5fa}.md-preview code{background:#262626;padding:2px 6px;border-radius:4px;font-size:12px}.md-preview ul,.md-preview ol{padding-left:20px}.md-preview li{margin:4px 0}`;
}

export function visualContainerMarkup(): string {
  return `<div id="visual-result" class="visual-result"></div>`;
}

export function viewToggleMarkup(): string {
  return `<div class="view-toggle"><button id="btn-visual" class="active" type="button">Visual</button><button id="btn-json" type="button">JSON</button></div>`;
}

/**
 * Returns the JS code for the view toggle + visual rendering logic.
 * This should be appended after the main tool script.
 */
export function visualScript(toolSlug: string): string {
  return `
var visualEl=document.getElementById('visual-result');
var btnVisual=document.getElementById('btn-visual');
var btnJson=document.getElementById('btn-json');
var currentView='visual';
if(btnVisual&&btnJson){
  btnVisual.addEventListener('click',function(){currentView='visual';btnVisual.classList.add('active');btnJson.classList.remove('active');showView();});
  btnJson.addEventListener('click',function(){currentView='json';btnJson.classList.add('active');btnVisual.classList.remove('active');showView();});
}
function showView(){
  if(currentView==='visual'&&visualEl.innerHTML){visualEl.classList.add('active');output.style.display='none';}
  else{visualEl.classList.remove('active');output.style.display='block';}
}
function renderVisual(data){
  if(!data||typeof data!=='object'){visualEl.innerHTML='';showView();return;}
  var html=getVisualHtml('${toolSlug}',data);
  if(html){visualEl.innerHTML=html;showView();}else{currentView='json';if(btnJson)btnJson.click();}
}
function getVisualHtml(slug,d){
  switch(slug){
    case 'meta-tag-checker':return renderMetaTag(d);
    case 'open-graph-preview':return renderOgPreview(d);
    case 'heading-structure-audit':return renderHeadingAudit(d);
    case 'landing-page-scorecard':return renderScorecard(d);
    case 'tech-stack-detector':return renderTechStack(d);
    case 'readability-score-checker':return renderReadability(d);
    case 'content-summary-generator':return renderSummary(d);
    case 'link-extractor':return renderLinkExtractor(d);
    case 'image-extractor':return renderImageExtractor(d);
    case 'redirect-checker':return renderRedirect(d);
    case 'robots-txt-inspector':return renderRobots(d);
    case 'sitemap-inspector':return renderSitemap(d);
    case 'url-to-markdown':case 'page-to-design-md':return renderMarkdown(d);
    default:return '';
  }
}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function badge(text,cls){return '<span class="badge '+cls+'">'+esc(text)+'</span>';}
function progressBar(val,max){var pct=Math.min(100,Math.max(0,(val/max)*100));var cls=pct>=75?'fill-green':pct>=50?'fill-amber':'fill-red';return '<div class="progress-bar"><div class="progress-fill '+cls+'" style="width:'+pct+'%"></div></div>';}
function statCard(label,value){return '<div class="stat-card"><div class="stat-label">'+esc(label)+'</div><div class="stat-value">'+esc(value)+'</div></div>';}

function renderMetaTag(d){
  var checks=[['Title',!!d.title],['Description',!!d.description],['Canonical',!!d.canonical],['og:title',!!(d.openGraph&&d.openGraph.title)],['og:description',!!(d.openGraph&&d.openGraph.description)],['og:image',!!(d.openGraph&&d.openGraph.image)],['twitter:card',!!(d.twitter&&d.twitter.card)]];
  var h='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">';
  checks.forEach(function(c){h+=badge(c[0],c[1]?'badge-pass':'badge-fail');});
  h+='</div>';
  if(d.title){var tl=d.title.length;h+='<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:11px;color:#737373;margin-bottom:4px"><span>Title ('+tl+' chars)</span><span style="color:'+(tl>=30&&tl<=60?'#6ee7b7':'#fcd34d')+'">30–60 target</span></div>'+progressBar(Math.min(tl,60),60)+'<div style="font-size:13px;color:#e5e5e5;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(d.title)+'</div></div>';}
  if(d.description){var dl=d.description.length;h+='<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:11px;color:#737373;margin-bottom:4px"><span>Description ('+dl+' chars)</span><span style="color:'+(dl>=70&&dl<=160?'#6ee7b7':'#fcd34d')+'">70–160 target</span></div>'+progressBar(Math.min(dl,160),160)+'<div style="font-size:13px;color:#e5e5e5;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(d.description)+'</div></div>';}
  if(d.issues&&d.issues.length){h+='<div style="margin-top:8px">';d.issues.forEach(function(issue){h+='<div style="font-size:12px;color:#fcd34d;padding:3px 0;display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#fcd34d;display:block"></span>'+esc(issue)+'</div>';});h+='</div>';}
  return h;
}

function renderOgPreview(d){
  var domain='';try{domain=new URL(d.url||d.inputUrl||'').hostname;}catch(e){domain=d.siteName||'';}
  var img=d.image?'<img src="'+esc(d.image)+'" alt="OG image"/>':'<span style="color:#737373;font-size:13px">No og:image</span>';
  return '<div class="og-card"><div class="og-card-image">'+img+'</div><div class="og-card-body"><div class="og-card-domain">'+esc(d.siteName||domain)+'</div><div class="og-card-title">'+esc(d.title||'No og:title')+'</div>'+(d.description?'<div class="og-card-desc">'+esc(d.description)+'</div>':'')+'</div></div>';
}

function renderHeadingAudit(d){
  var headings=d.headings||[];var issues=d.issues||[];
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:8px">'+headings.length+' headings'+(issues.length?' · <span style="color:#fcd34d">'+issues.length+' issue'+(issues.length>1?'s':'')+'</span>':'')+'</div>';
  h+='<ul class="heading-tree">';
  headings.slice(0,30).forEach(function(item){
    var colors={1:'badge-blue',2:'badge-purple',3:'badge-neutral',4:'badge-neutral',5:'badge-neutral',6:'badge-neutral'};
    h+='<li style="padding-left:'+(((item.level||1)-1)*16)+'px">'+badge('H'+(item.level||1),colors[item.level]||'badge-neutral')+' <span style="font-size:13px;color:#e5e5e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(item.text||'(empty)')+'</span></li>';
  });
  if(headings.length>30)h+='<li style="font-size:11px;color:#737373;padding-left:16px">+ '+(headings.length-30)+' more...</li>';
  h+='</ul>';
  if(issues.length){h+='<div style="border-top:1px solid #262626;margin-top:10px;padding-top:10px">';issues.forEach(function(issue){h+='<div style="font-size:12px;color:#fcd34d;padding:2px 0">⚠ '+esc(issue)+'</div>';});h+='</div>';}
  return h;
}

function renderScorecard(d){
  var total=d.total||0;var cats=d.categories||{};
  var color=total>=75?'#6ee7b7':total>=50?'#fcd34d':'#fca5a5';
  var h='<div style="margin-bottom:16px"><span style="font-size:36px;font-weight:700;color:'+color+'">'+total+'</span><span style="font-size:16px;color:#737373"> /100</span></div>';
  var labels={seo:'SEO',messaging:'Messaging',trust:'Trust',cta:'CTA',offer:'Offer'};
  Object.keys(cats).forEach(function(key){
    h+='<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:11px;color:#a3a3a3;margin-bottom:4px"><span>'+(labels[key]||key)+'</span><span>'+cats[key]+'/20</span></div>'+progressBar(cats[key]||0,20)+'</div>';
  });
  return h;
}

function renderTechStack(d){
  var dets=d.detections||[];
  if(!dets.length)return '<div style="font-size:13px;color:#737373">No technologies detected.</div>';
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:8px">'+dets.length+' technolog'+(dets.length===1?'y':'ies')+' detected</div><div class="pill-grid">';
  dets.forEach(function(t){h+='<span class="pill">'+esc(t)+'</span>';});
  return h+'</div>';
}

function renderReadability(d){
  var score=d.fleschReadingEase||0;
  var color=score>=80?'fill-green':score>=60?'fill-green':score>=50?'fill-amber':'fill-red';
  var label=score>=80?'Very Easy':score>=70?'Fairly Easy':score>=60?'Standard':score>=50?'Fairly Difficult':score>=30?'Difficult':'Very Difficult';
  var h='<div style="margin-bottom:16px"><span style="font-size:32px;font-weight:700;color:#fafafa">'+score+'</span><span style="font-size:13px;color:#737373"> /100 Flesch Reading Ease</span></div>';
  h+='<div class="progress-bar" style="height:12px;margin-bottom:8px"><div class="progress-fill '+color+'" style="width:'+score+'%"></div></div>';
  h+='<div style="display:flex;justify-content:space-between;font-size:11px;color:#a3a3a3;margin-bottom:16px"><span>'+label+'</span>'+(d.gradeLevel?'<span>'+esc(d.gradeLevel)+'</span>':'')+'</div>';
  h+='<div class="stat-grid">'+statCard('Words',d.wordCount||0)+statCard('Sentences',d.sentenceCount||0)+statCard('Avg sentence',(d.avgSentenceLength||0)+' words')+statCard('Reading time',(d.readingTimeMinutes||0)+' min')+'</div>';
  return h;
}

function renderSummary(d){
  var summary=d.summary||[];var bullets=d.bullets||[];
  var h='<div style="font-size:11px;color:#737373;margin-bottom:8px">';
  if(d.title)h+='<span style="color:#e5e5e5;font-weight:500">'+esc(d.title)+'</span> · ';
  if(d.wordCount)h+=d.wordCount+' words';
  if(d.usedAI)h+=' · '+badge('AI','badge-purple');
  h+='</div>';
  if(summary.length){h+='<div class="summary-block">';summary.forEach(function(s){h+='<p style="margin:0 0 8px">'+esc(s)+'</p>';});h+='</div>';}
  if(bullets.length){h+='<ul class="summary-bullets">';bullets.forEach(function(b){h+='<li>'+esc(b)+'</li>';});h+='</ul>';}
  return h;
}

function renderLinkExtractor(d){
  var links=d.links||[];
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:8px">'+(d.total||links.length)+' total · <span style="color:#93c5fd">'+(d.internal||0)+' internal</span> · <span style="color:#6ee7b7">'+(d.external||0)+' external</span></div>';
  h+='<table class="link-table"><thead><tr><th>Type</th><th>Anchor</th><th>URL</th></tr></thead><tbody>';
  links.slice(0,20).forEach(function(l){
    var cls=l.type==='internal'?'badge-blue':'badge-pass';
    h+='<tr><td>'+badge(l.type==='internal'?'INT':'EXT',cls)+'</td><td>'+esc(l.text||'(no text)')+'</td><td>'+esc(l.href)+'</td></tr>';
  });
  h+='</tbody></table>';
  if(links.length>20)h+='<div style="font-size:11px;color:#737373;margin-top:8px">Showing 20 of '+links.length+'</div>';
  return h;
}

function renderImageExtractor(d){
  var images=d.images||[];
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:8px">'+(d.total||images.length)+' image'+(images.length!==1?'s':'')+' found</div><div class="img-grid">';
  images.slice(0,12).forEach(function(img){
    h+='<div class="img-thumb" style="border-color:'+(img.alt?'#262626':'#7f1d1d')+'"><img src="'+esc(img.src)+'" alt="'+esc(img.alt||'')+'" loading="lazy" onerror="this.style.display=\\'none\\'"/><div class="img-thumb-meta">';
    if(img.likelyHero)h+=badge('HERO','badge-warn')+' ';
    if(!img.alt)h+=badge('NO ALT','badge-fail')+' ';
    if(img.width&&img.height)h+='<span>'+img.width+'×'+img.height+'</span>';
    h+='</div></div>';
  });
  h+='</div>';
  if(images.length>12)h+='<div style="font-size:11px;color:#737373;margin-top:8px">Showing 12 of '+images.length+'</div>';
  return h;
}

function renderRedirect(d){
  var chain=d.chain||[];
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:8px">'+(d.hops||0)+' redirect'+(d.hops!==1?'s':'')+'</div>';
  chain.forEach(function(hop,i){
    var cls=hop.status>=200&&hop.status<300?'badge-pass':hop.status===301?'badge-blue':(hop.status===302||hop.status===307)?'badge-warn':'badge-fail';
    h+='<div class="chain-node">'+(i<chain.length-1?'<div class="chain-line"></div>':'')+badge(hop.status||'ERR',cls)+' <span style="font-size:13px;color:#e5e5e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(hop.url)+'</span></div>';
  });
  if(d.finalUrl)h+='<div style="border-top:1px solid #262626;margin-top:8px;padding-top:8px"><div style="font-size:11px;color:#737373">Final destination</div><div style="font-size:13px;color:#6ee7b7;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(d.finalUrl)+'</div></div>';
  return h;
}

function renderRobots(d){
  var rules=d.rules||[];var sitemaps=d.sitemaps||[];
  var h='';
  if(d.summary)h+='<div style="font-size:13px;color:#e5e5e5;margin-bottom:12px;line-height:1.6">'+esc(d.summary)+'</div>';
  rules.forEach(function(r){
    h+='<div class="rules-group"><div class="rules-group-title">User-Agent: '+esc(r.userAgent)+'</div>';
    (r.disallow||[]).forEach(function(p){h+='<div class="rule-line">'+badge('Disallow','badge-fail')+' <code>'+esc(p||'/')+'</code></div>';});
    (r.allow||[]).forEach(function(p){h+='<div class="rule-line">'+badge('Allow','badge-pass')+' <code>'+esc(p)+'</code></div>';});
    h+='</div>';
  });
  if(sitemaps.length){h+='<div style="margin-top:8px"><div style="font-size:11px;color:#737373;margin-bottom:4px">Sitemaps</div>';sitemaps.forEach(function(s){h+='<div style="font-size:12px;color:#60a5fa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(s)+'</div>';});h+='</div>';}
  return h;
}

function renderSitemap(d){
  var inspected=d.inspected||[];var declared=d.declaredSitemaps||[];
  var totalUrls=inspected.reduce(function(s,x){return s+x.urlCount;},0);
  var h='<div style="font-size:12px;color:#a3a3a3;margin-bottom:12px">'+inspected.length+' sitemap'+(inspected.length!==1?'s':'')+' · '+totalUrls+' total URLs'+(declared.length?' · '+declared.length+' in robots.txt':'')+'</div>';
  inspected.forEach(function(sm){
    h+='<div class="rules-group"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'+badge(sm.type,sm.type==='urlset'?'badge-blue':'badge-purple')+' <span style="font-size:12px;color:#e5e5e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(sm.url)+'</span></div>';
    h+='<div style="font-size:11px;color:#737373">'+sm.urlCount+' URLs'+(sm.childSitemaps?' · '+sm.childSitemaps+' child sitemaps':'')+'</div>';
    if(sm.sampleUrls&&sm.sampleUrls.length){h+='<div style="margin-top:6px">';sm.sampleUrls.slice(0,5).forEach(function(u){h+='<div style="font-size:11px;color:#525252;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(u)+'</div>';});if(sm.sampleUrls.length>5)h+='<div style="font-size:10px;color:#525252">+ '+(sm.sampleUrls.length-5)+' more</div>';h+='</div>';}
    h+='</div>';
  });
  return h;
}

function renderMarkdown(d){
  var md=d.markdown||'';if(!md)return '';
  var h='<div style="font-size:11px;color:#737373;margin-bottom:8px">';
  if(d.title)h+='<span style="color:#e5e5e5">'+esc(d.title)+'</span> · ';
  h+=md.split(/\\s+/).length+' words</div>';
  var rendered=md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>').replace(/\\*(.+?)\\*/g,'<em>$1</em>').replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g,'<a href="$2">$1</a>').replace(/^[-*] (.+)$/gm,'<li>$1</li>').replace(/\\n\\n/g,'<br><br>');
  h+='<div class="md-preview">'+rendered+'</div>';
  return h;
}
`;
}
