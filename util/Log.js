var Log = {
    log: function(msg, subst){
        (subst == null)? cc.log(msg): cc.log(msg, subst);
    },


    warn: function(msg, subst){
        (subst == null)? cc.warn(msg): cc.warn(msg, subst);
    },

    error: function(msg, subst){
        (subst == null)? cc.error(msg): cc.error(msg, subst);
    },
};

module.exports = Log;