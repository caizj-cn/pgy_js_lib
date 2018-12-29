const Log = {
    log(msg, ...subst){
        cc.log(msg, subst);
    },

    warn(msg, ...subst){
        c.warn(msg, subst)
    },

    error(msg, ...subst){
        cc.error(msg, subst)
    },
};

export default Log;