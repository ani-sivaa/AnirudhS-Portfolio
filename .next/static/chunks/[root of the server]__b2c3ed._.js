(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__b2c3ed._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/components/Header.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$react$2d$social$2d$icons$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-social-icons/dist/react-social-icons.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-social-icons/dist/component.js [client] (ecmascript)");
;
;
;
function Header({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 p-10 flex items-start justify-between max-w-7xl mx-auto xl:items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                /*Intitial setup of the animation*/ initial: {
                    x: -500,
                    opacity: 0,
                    scale: 0.5
                },
                /* final animation (resets the objects to its original position hence x:0 ) */ animate: {
                    x: 0,
                    opacity: 1,
                    scale: 1
                },
                /*this code makes it that the social icons on the top left header dont just fly into the screen too quick duration is in seconds I believe*/ transition: {
                    duration: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-row items-center space-x-9 ",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
                            url: "https://github.com/ani-sivaa"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 34,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
                            url: "https://www.linkedin.com/in/anisiva/"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 37,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
                            url: "https://devpost.com/anisiva213?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 40,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 32,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    x: 500,
                    opacity: 0,
                    scale: 0.5
                },
                animate: {
                    x: 0,
                    opacity: 1,
                    scale: 1.5
                },
                transition: {
                    duration: 1
                },
                className: "flex flex-row items-center text-gray-300 cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#contact",
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
                            className: "cursor_pointer",
                            network: "email",
                            fgColor: "gray",
                            bgColor: "transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 66,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "uppercase hidden md:inline-flex text-sm text-gray-400 ml-2",
                            children: "Get In Touch"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 72,
                            columnNumber: 5
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 65,
                    columnNumber: 2
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 47,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this);
}
_c = Header;
var _c;
__turbopack_refresh__.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/BackgroundCircles.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
function BackgroundCircles({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            scale: [
                1,
                2,
                2,
                3,
                1
            ],
            opacity: [
                0.1,
                0.2,
                0.4,
                0.8,
                0.1,
                1.0
            ],
            borderRadius: [
                "20%",
                "20%",
                "60%",
                "80",
                "40%"
            ]
        },
        transition: {
            duration: 2.5
        },
        className: "relative flex justify-center items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "  absolute border border-[#dbd9aa] rounded-full h-[600px] w-[600px] mt-52 animate-pulse opacity-65 "
            }, void 0, false, {
                fileName: "[project]/components/BackgroundCircles.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute border border-[#c4c0c0] h-[400px]w=[400px] absolute mt-52 "
            }, void 0, false, {
                fileName: "[project]/components/BackgroundCircles.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-full border border-[#333333] h-[600px]w=[600px] absolute mt-52"
            }, void 0, false, {
                fileName: "[project]/components/BackgroundCircles.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-full border border-[#f93232] opacity-20 h-[400px]w=[400[x] absolute mt-52 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/components/BackgroundCircles.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BackgroundCircles.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = BackgroundCircles;
const __TURBOPACK__default__export__ = BackgroundCircles;
var _c;
__turbopack_refresh__.register(_c, "BackgroundCircles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Hero.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Hero)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$typewriter$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-simple-typewriter/dist/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackgroundCircles$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/BackgroundCircles.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
function Hero({}) {
    _s();
    const [text, count] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$typewriter$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTypewriter"])({
        words: [
            "Hi, my name is Anirudh Sivakumar",
            "Please-Hire-Me.tsx",
            "<LookingFor2025Internships :)/>"
        ],
        loop: true,
        delaySpeed: 2000
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackgroundCircles$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/Hero.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "relative rounded-full h-32 w-32 mx-auto object-cover",
                src: "https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718319210642?e=1738195200&v=beta&t=TX8nUs_HdgaljGTpI1k05ZCQOtNcBeT0-j4Q3yxY8Wk"
            }, void 0, false, {
                fileName: "[project]/components/Hero.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-gray-500 pb-2 tracking-[15px]",
                        children: "Software Engineer"
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl lg:text-3xl font-semibold px-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-3",
                                children: text
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$typewriter$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Cursor"], {
                                cursorColor: "#F7AB0A"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#about",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "heroButton",
                                    children: "About"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#Experience",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "heroButton",
                                    children: "Experience"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 40,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#Skills",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "heroButton",
                                    children: "Skills"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 43,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#Projects",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "heroButton",
                                    children: "Projects"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Hero.tsx",
                lineNumber: 26,
                columnNumber: 10
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Hero.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Hero, "5spqq7+yLq/cLskXuVTIzTmtjlw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$typewriter$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTypewriter"]
    ];
});
_c = Hero;
var _c;
__turbopack_refresh__.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/About.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>About)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
function About({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl",
                children: "About"
            }, void 0, false, {
                fileName: "[project]/components/About.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                initial: {
                    x: -200,
                    opacity: 0
                },
                animate: {
                    x: 0,
                    opacity: 1
                },
                transition: {
                    duration: 1.2
                },
                viewport: {
                    once: true
                },
                whileInView: {
                    x: 0
                },
                src: "https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718319210642?e=1738195200&v=beta&t=TX8nUs_HdgaljGTpI1k05ZCQOtNcBeT0-j4Q3yxY8Wk",
                className: "-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
            }, void 0, false, {
                fileName: "[project]/components/About.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-10 px-0 md:px-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-4xl font-semibold",
                        children: [
                            "Here is a",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: '="underline decoratin-[#F7AB0A]/50',
                                children: " little"
                            }, void 0, false, {
                                fileName: "[project]/components/About.tsx",
                                lineNumber: 35,
                                columnNumber: 22
                            }, this),
                            " ",
                            "Background"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/About.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: "Hi, I'm Anirudh Sivakumar, an undergraduate student pursuing a Computer Science B.S. degree. I'm passionate about Machine Learning and Full-Stack Development, which is reflected in the labs and hands-on experience I've gained over the years. With a strong foundation in both theoretical and practical aspects of software engineering, I have explored various projects and roles, from embedded systems to machine learning applications. I continue to expand my knowledge and skills in these areas as I work towards my career goals."
                    }, void 0, false, {
                        fileName: "[project]/components/About.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/About.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/About.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = About;
var _c;
__turbopack_refresh__.register(_c, "About");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Skill.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
function Skill({ image, title, proficiency }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative flex cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                initial: {
                    x: 150
                },
                transition: {
                    duration: 1
                },
                whileInView: {
                    opacity: 1,
                    x: 0
                },
                src: image,
                alt: title,
                className: "rounded-full border border-gray-500 object-cover w-28 h-28 xl:w-32 xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
            }, void 0, false, {
                fileName: "[project]/components/Skill.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-28 h-28 xl:w-32 xl:h-32 rounded-full z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-bold text-black",
                        children: proficiency
                    }, void 0, false, {
                        fileName: "[project]/components/Skill.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Skill.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Skill.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Skill.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Skill;
const __TURBOPACK__default__export__ = Skill;
var _c;
__turbopack_refresh__.register(_c, "Skill");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Skills.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Skill.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
;
function Skills({}) {
    const skills = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png",
            title: "Python",
            proficiency: "Intermediate"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            title: "JavaScript",
            proficiency: "Intermediate"
        },
        {
            image: "https://devonblog.com/wp-content/uploads/2022/06/tailwind-thumb.jpg",
            title: "TailWindCSS",
            proficiency: "Intermediate"
        },
        {
            image: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png",
            title: "React",
            proficiency: "Beginner"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
            title: "TypeScript",
            proficiency: "Beginner"
        },
        {
            image: "https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg",
            title: "Next.js",
            proficiency: "Beginner"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        whileInView: {
            opacity: 1
        },
        transition: {
            duration: 1.5
        },
        className: "h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl",
                children: "Skills"
            }, void 0, false, {
                fileName: "[project]/components/Skills.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm",
                children: "Hover over a skill for current proficiency"
            }, void 0, false, {
                fileName: "[project]/components/Skills.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-5",
                children: skills.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        image: skill.image,
                        title: skill.title,
                        proficiency: skill.proficiency
                    }, index, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Skills.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Skills.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = Skills;
const __TURBOPACK__default__export__ = Skills;
var _c;
__turbopack_refresh__.register(_c, "Skills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Projects.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
function Projects({}) {
    // Define your projects with more detailed information
    const projects = [
        {
            title: "Letmetalktoahuman.ai",
            description: "CalHacks2024 Winner (VAPI Virality Track)- Integrated VAPI for a hyper realistic voice agent that gets past automated customer support menus and then forwards the call to a user once a REAL representative is on the line. Utilized GROQ for AI Inference, VAPI for the Voice Agent, and React for the frontend.",
            imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LceDUwCcZm6APQWnkRhh6ohiJ8h5Il6h4g&s"
        },
        {
            title: "NLP Search + Churn Prediction Model",
            description: "AI solutions for e-commerce websites presented for GDXinc. I was chosen out of 300 applicants to present my NLP Search and churn prediction model solution.",
            imageSrc: "https://i.ibb.co/NK0wwBL/IMG-7653.jpg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl",
                children: "Projects"
            }, void 0, false, {
                fileName: "[project]/components/Projects.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20",
                children: projects.map((project, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                                initial: {
                                    y: -300,
                                    opacity: 0
                                },
                                transition: {
                                    duration: 1.2
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: true
                                },
                                src: project.imageSrc,
                                alt: `Project ${i + 1}`,
                                className: "relative rounded-full h-48 w-48 mx-auto object-cover "
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center max-w-4xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-4xl font-semibold text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "underline decoration-[#FFFDD0]",
                                                children: [
                                                    "Project ",
                                                    i + 1,
                                                    " of ",
                                                    projects.length,
                                                    ":",
                                                    " "
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Projects.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this),
                                            project.title
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Projects.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-lg text-center md:text-left",
                                        children: project.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Projects.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/Projects.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Projects.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"
            }, void 0, false, {
                fileName: "[project]/components/Projects.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                src: "https://www.freeiconspng.com/thumbs/white-arrow-png/right-white-arrow-png-20.png",
                alt: "Scroll Right",
                className: "absolute right-10 bottom-50 h-10 w-10 cursor-pointer",
                animate: {
                    y: [
                        0,
                        -10,
                        0
                    ]
                },
                transition: {
                    duration: 1,
                    repeat: Infinity
                }
            }, void 0, false, {
                fileName: "[project]/components/Projects.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Projects.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Projects;
const __TURBOPACK__default__export__ = Projects;
var _c;
__turbopack_refresh__.register(_c, "Projects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ContactMe.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hook-form/dist/index.esm.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PhoneIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/solid/esm/PhoneIcon.js [client] (ecmascript) <export default as PhoneIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$EnvelopeIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvelopeIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/solid/esm/EnvelopeIcon.js [client] (ecmascript) <export default as EnvelopeIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MapPinIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/solid/esm/MapPinIcon.js [client] (ecmascript) <export default as MapPinIcon>");
;
var _s = __turbopack_refresh__.signature();
;
;
function ContactMe({}) {
    _s();
    const { register, handleSubmit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"])();
    const onSubmit = (formData)=>{
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`Hi, my name is ${formData.name}. \n ${formData.message} \n (${formData.email} (${formData.role}))`);
        window.location.href = `mailto:anisiva213@gmail.com?subject=${subject}&body=${body}`;
        console.log(formData); // Debugging: Log form data
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center space-y-4 mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "uppercase tracking-[20px] text-gray-500 text-2xl",
                        children: "Contact Me"
                    }, void 0, false, {
                        fileName: "[project]/components/ContactMe.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-4xl font-semibold text-center",
                        children: [
                            "I got what you need.",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "decoration-[#FFFDD0] underline",
                                children: "Let's talk."
                            }, void 0, false, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContactMe.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContactMe.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col space-y-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-5 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$PhoneIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneIcon$3e$__["PhoneIcon"], {
                                        className: "h-7 w-7 text-[#FFFDD0]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl",
                                        children: "+1(925)548-0122"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-5 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$EnvelopeIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvelopeIcon$3e$__["EnvelopeIcon"], {
                                        className: "h-7 w-7 text-[#FFFDD0]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl",
                                        children: "anisiva213@gmail.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-5 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$MapPinIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinIcon$3e$__["MapPinIcon"], {
                                        className: "h-7 w-7 text-[#FFFDD0]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl",
                                        children: "Santa Cruz, CA"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContactMe.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit(onSubmit),
                        className: "flex flex-col space-y-2 w-fit mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ...register("name", {
                                            required: true
                                        }),
                                        className: "contactInput",
                                        type: "text",
                                        placeholder: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ...register("email", {
                                            required: true
                                        }),
                                        className: "contactInput",
                                        type: "email",
                                        placeholder: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        ...register("role"),
                                        className: "contactInput",
                                        defaultValue: "",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                disabled: true,
                                                children: "I am a..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContactMe.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "recruiter",
                                                children: "Recruiter"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContactMe.tsx",
                                                lineNumber: 86,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "student",
                                                children: "Student"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContactMe.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "other",
                                                children: "Other"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContactMe.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContactMe.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ...register("subject", {
                                    required: true
                                }),
                                className: "contactInput",
                                type: "text",
                                placeholder: "Subject"
                            }, void 0, false, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ...register("message", {
                                    required: true
                                }),
                                className: "contactInput",
                                placeholder: "Your Message"
                            }, void 0, false, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "bg-[#FFFDD0] py-5 px-10 rounded-md text-black font-bold",
                                children: "Submit"
                            }, void 0, false, {
                                fileName: "[project]/components/ContactMe.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContactMe.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContactMe.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ContactMe.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ContactMe, "zkd3JmxRK/AmyiWtSfciHeYO5Zk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = ContactMe;
const __TURBOPACK__default__export__ = ContactMe;
var _c;
__turbopack_refresh__.register(_c, "ContactMe");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ExperienceCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
const ExperienceCard = ({ jobTitle, company, duration, description, technologies, imageSrc })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px]  snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                src: imageSrc,
                initial: {
                    y: -100,
                    opacity: 0
                },
                transition: {
                    duration: 1.2
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true
                },
                alt: "Company Logo",
                className: "w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-top"
            }, void 0, false, {
                fileName: "[project]/components/ExperienceCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-0 md:px-10 text-center md:text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-2xl font-bold mt-1",
                        children: jobTitle
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-400",
                        children: company
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2 my-4 justify-center md:justify-start",
                        children: technologies.map((tech, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: tech,
                                alt: `Technology ${index}`,
                                className: "h-10 w-10 rounded-full"
                            }, index, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "uppercase py-5 text-gray-300",
                        children: duration
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc space-y-4 ml-5 text-lg",
                        children: description.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: point
                            }, index, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExperienceCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ExperienceCard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
_c = ExperienceCard;
const __TURBOPACK__default__export__ = ExperienceCard;
var _c;
__turbopack_refresh__.register(_c, "ExperienceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Header.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Hero.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/About.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Skills.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Projects.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactMe$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ContactMe.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ExperienceCard.tsx [client] (ecmascript)"); // Import ExperienceCard
;
;
;
;
;
;
;
;
;
;
const experiences = [
    {
        jobTitle: "Machine Learning & Large Language Models Researcher",
        company: "AIEA Lab",
        duration: "September 2024 - Present",
        description: [
            "Working with SWI-Prolog to understand LLM logic-based reasoning.",
            "Utilized OpenAI API to run queries and examples in SWI-Prolog."
        ],
        technologies: [
            "https://avatars.githubusercontent.com/u/6884283?s=280&v=4",
            "data:image/png;base64,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",
            "data:image/jpeg;base64,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"
        ],
        imageSrc: "data:image/jpeg;base64,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"
    },
    {
        jobTitle: "SWE/FOI Intern",
        company: "Berkshire Hathaway - MedPro",
        duration: "January 2024 - April 2024",
        description: [
            "Worked on responsive frontend components using react.js "
        ],
        technologies: [
            "data:image/png;base64,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"
        ],
        imageSrc: "https://www.reuters.com/resizer/v2/6MWYMVTIQNPQPE522LFE5PT6LU.jpg?auth=12382199fd3fd2cb5f41922e64c67fdb05569a3fd2e540d4c5d7dd3092815426&width=4232&quality=80"
    }
];
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[rgb(17,17,17)] text-white h-screen snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Anirudh's Portfolio"
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "hero",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about",
                className: "snap-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "Experience",
                className: "snap-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory",
                    children: experiences.map((exp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            jobTitle: exp.jobTitle,
                            company: exp.company,
                            duration: exp.duration,
                            description: exp.description,
                            technologies: exp.technologies,
                            imageSrc: exp.imageSrc
                        }, index, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "Skills",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "Projects",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "contact",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactMe$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                href: "#hero",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "sticky bottom-5 w-full cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: "h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer",
                            src: "https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718319210642?e=1738195200&v=beta&t=TX8nUs_HdgaljGTpI1k05ZCQOtNcBeT0-j4Q3yxY8Wk",
                            alt: "Homepagebutton"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: require } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: require } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__b2c3ed._.js.map