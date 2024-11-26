(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__34d6c1._.js", {

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
                            url: "https://github.com/ani-sivaa"
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
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$social$2d$icons$2f$dist$2f$component$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
                        className: "cursor_pointer",
                        network: "email",
                        fgColor: "gray",
                        bgColor: "transparent"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "uppercase hidden md:inline-flex text-sm text-gray-400 ",
                        children: " Get In Touch"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
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
            "I-love-to-eat-good-food.tsx",
            "<ButILoveToCodeMore/>"
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
"[project]/components/ExperienceCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ExperienceCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
function ExperienceCard({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px]  snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
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
                src: "data:image/jpeg;base64,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",
                alt: "Company Logo",
                className: "w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-top"
            }, void 0, false, {
                fileName: "[project]/components/ExperienceCard.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-0 md:px-10 text-center md:text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-2xl font-bold mt-1",
                        children: "Machine Learning & Large Language Models Researcher @ AIEA Lab"
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-400",
                        children: "University of California, Santa Cruz"
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2 my-4 justify-center md:justify-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "h-10 w-10 rounded-full",
                                src: "data:image/webp;base64,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",
                                alt: "Prologswi"
                            }, void 0, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "h-10 w-10 rounded-full",
                                src: "data:image/png;base64,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",
                                alt: "OpenAI"
                            }, void 0, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "h-10 w-10 rounded-full",
                                src: "data:image/jpeg;base64,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",
                                alt: "Python"
                            }, void 0, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "uppercase py-5 text-gray-300",
                        children: "Started: September 2024 - Present"
                    }, void 0, false, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc space-y-4 ml-5 text-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Working with SWI-Prolog to understand LLM logic-based reasoning."
                            }, void 0, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 65,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Utilized OpenAI API to run queries and examples in SWI-Prolog."
                            }, void 0, false, {
                                fileName: "[project]/components/ExperienceCard.tsx",
                                lineNumber: 66,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExperienceCard.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExperienceCard.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ExperienceCard.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = ExperienceCard;
var _c;
__turbopack_refresh__.register(_c, "ExperienceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/WorkExperience.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ExperienceCard.tsx [client] (ecmascript)");
;
;
function WorkExperience({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col items-center text-left max-w-full px-10 justify-start mx-auto relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl",
                children: "Experience"
            }, void 0, false, {
                fileName: "[project]/components/WorkExperience.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-28 w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/WorkExperience.tsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/WorkExperience.tsx",
                            lineNumber: 18,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExperienceCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/WorkExperience.tsx",
                            lineNumber: 19,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/WorkExperience.tsx",
                    lineNumber: 16,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/WorkExperience.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/WorkExperience.tsx",
        lineNumber: 7,
        columnNumber: 7
    }, this);
}
_c = WorkExperience;
const __TURBOPACK__default__export__ = WorkExperience;
var _c;
__turbopack_refresh__.register(_c, "WorkExperience");
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
function Skill({}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative flex cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].img, {
                initial: {
                    x: 200
                },
                transition: {
                    duration: 1
                },
                whileInView: {
                    opacity: 1,
                    x: 0
                },
                src: "data:image/png;base64,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",
                alt: "Skill image",
                className: "rounded-full border border-gray-500 object-cover w-24 h-24 xl:w-32 filter group-hover:grayscale transition duration-300 ease-in-out"
            }, void 0, false, {
                fileName: "[project]/components/Skill.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute opacity-0 group-hover:opacity-80 transition duration-300  ease-in-out group-hover:bg-white h-24 w-24 md:w-28 xl:w-32 xl:h-32 rounded-full z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold text-black opacity-100",
                        children: "100%"
                    }, void 0, false, {
                        fileName: "[project]/components/Skill.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Skill.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Skill.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Skill.tsx",
        lineNumber: 7,
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
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm",
                children: "Hover over a skill for current proficiency"
            }, void 0, false, {
                fileName: "[project]/components/Skills.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skill$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Skills.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Skills.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Skills.tsx",
        lineNumber: 7,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WorkExperience$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/WorkExperience.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Skills.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Projects.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[rgb(17,17,17)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Anirudh's Portfolio"
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "hero",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "about",
                className: "snap-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "Experience",
                className: "snap-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WorkExperience$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "Skills",
                className: "snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 14,
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__34d6c1._.js.map