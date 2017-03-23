/**
 * Created by schanx on 3/20/17.
 */
module.exports=function (model) {

    var mongoose=require("mongoose");

    var widgetSchema=mongoose.Schema({
        _page:{type:mongoose.Schema.Types.ObjectId, ref:'pageModel'},
        type:{type:String,enum:['HEADER','IMAGE','YOUTUBE','HTML','TEXT']},
        name:String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated:{type:Date,default:Date.now()},
        pos: Number
    },{collection:"assignment.mongo.widgets"});

    widgetSchema.post('remove',function(){
        var widget = this;
        var pageModel = model.pageModel.getModel();
        pageModel.findById(widget._page)
            .then(function(page){
            var index =page.widgets.indexOf(widget._id);
            console.log("inside wid sche"+index);
            if(index > -1){
                page.widgets.splice(index,1);
                page.save();
            }
        });
        //widgetModel.remove({'_id',{'$in':widget}})
    });

   return widgetSchema;
};
//module.exports= widgetSchema;//function(){