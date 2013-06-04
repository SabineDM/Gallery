xquery version "3.0";

module namespace app="localhost:8080/exist/apps/gallerie/templates";
declare namespace atom="http://www.w3.org/2005/Atom";
declare namespace html="http://www.w3.org/1999/xhtml";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "html5";
declare option output:media-type "text/html";
import module namespace templates="http://exist-db.org/xquery/templates" ;

declare function app:show-picture($node as node(), $model as map(*)) {
    let $pictures := doc("/db/apps/Gallerie/data/feed.atom")//atom:content/@src/string()
    for $picture at $pos in $pictures
    return
        element { node-name($node) } {
            if($pos = 1) then
                attribute class { "active" }
            else
                (),
            <img src="{$picture}"/>
        }
};

declare function app:show-catalog($node as node(), $model as map(*)) {
    let $entries := doc("/db/apps/Gallerie/data/feed.atom")//atom:entry
    for $entry at $pos in $entries
    return
        element { node-name($node) } {
            if($pos = 1) then
                attribute class { "active" }
            else
                (),
            <img src="data/{$entry/atom:link/@href/string()}"/>,
            <span class="description" style="display: none;">
                <h1>{$entry/atom:title/text()}</h1>
                {$entry/atom:content/*}
            </span>
        }
};

declare %templates:wrap function app:show-thumbnail($node as node(), $model as map(*)){
    let $pictures := doc("/db/apps/Gallerie/data/feed.atom")//atom:link/@href/string()
    for $picture in $pictures
        return
            <li>
                <img src="data/{$picture}" />
            </li>
};

declare function app:show-text($node as node(), $model as map(*)){
        let $entries :=  doc("/db/apps/Gallerie/data/feed.atom")//atom:entry
        for $entry in $entries
        return
          
            let $text := //atom:content/div/text()
            let $title :=//atom:title/text()
                
                return
                    <div>
                        <h2>{$title}</h2>
                        <p>{$text}</p>
                    </div>
};

                
                
                


